import ERC20ABI from "abi/ERC20ABI.json";
import v1StrategyABI from "abi/v1StrategyMinimumABI.json";
import v1VaultABI from "abi/v1VaultABI";
import { actions } from "components/vaultsReport/slice";
import { forIn, keyBy, transform, forEach } from "lodash";
import { getContractKey } from "utils/contractKey";
import getTokenSymbolAlias from "utils/getTokenSymbolAlias";
import BatchCall from "web3-batch-call";

function addContractToDrizzle(contractKey, vaultContract) {
  if (!drizzle.contracts[contractKey]) {
    drizzle.addContract({
      contractName: contractKey,
      web3Contract: vaultContract,
    });
  }
}

function setUpContractDataSync(contractKey, method, methodArgs = []) {
  drizzle.contracts[contractKey].methods[method].cacheCall(...methodArgs);
}

function initializeContractData(vaults, web3, userAddress, dispatch) {
  let strategyContractsAddedToDrizzle = [];
  forEach(vaults, (vault) => {
    // Add vault contract to drizzle.
    const vaultContract = new web3.eth.Contract(v1VaultABI, vault.address);
    const vaultContractKey = getContractKey("vault", vault.address);
    addContractToDrizzle(vaultContractKey, vaultContract);

    // Sync vault holdings, user holdings and price per share
    setUpContractDataSync(vaultContractKey, "balance");
    setUpContractDataSync(vaultContractKey, "balanceOf", [userAddress]);
    setUpContractDataSync(vaultContractKey, "getPricePerFullShare");

    // Add vaults strategy contract to drizzle.
    let strategyAddress = vault.strategyAddress;

    let strategyContract = new web3.eth.Contract(v1StrategyABI, strategyAddress);
    const strategyContractKey = getContractKey("strategy", strategyAddress);
    addContractToDrizzle(strategyContractKey, strategyContract);

    strategyContractsAddedToDrizzle[strategyAddress] = strategyContract;
  });

  // Fetch and store strategy token data not available from registry.
  // This is required as some vaults can have different want tokens from their strategy, e.g. when
  // the vault uses its holdings as collateral and its strategy uses a borrowed token.
  (async () => {
    const batchCall = new BatchCall({ web3 });

    const strategyAddresses = Object.keys(strategyContractsAddedToDrizzle);
    const strategyWantTokenMapping = await getStrategyWantTokenMapping(
      batchCall,
      strategyAddresses
    );
    dispatch(actions.getStrategyWantTokenMapping({ strategyWantTokenMapping }));

    const strategyWantTokenAddresses = Object.values(strategyWantTokenMapping);
    let strategyTokenData = await getStrategyTokenData(batchCall, strategyWantTokenAddresses);
    strategyTokenData = keyBy(strategyTokenData, "address");

    dispatch(actions.getStrategyTokenData({ strategyTokenData }));

    strategyAddresses.forEach((strategyAddress) => {
      const strategyContractKey = getContractKey("strategy", strategyAddress);
      setUpContractDataSync(strategyContractKey, "balanceOf");
    });
  })();
}

async function getStrategyWantTokenMapping(batchCall, strategyAddresses) {
  const strategyWantTokenAddressesBatchResult = await batchCall.execute([
    {
      namespace: "addresses",
      addresses: strategyAddresses,
      abi: v1StrategyABI,
      readMethods: [{ name: "want" }],
    },
  ]);

  const strategyWantTokenMapping = strategyWantTokenAddressesBatchResult.reduce(
    (result, mapping) => {
      result[mapping.address] = mapping.want[0].value;
      return result;
    },
    {}
  );

  return strategyWantTokenMapping;
}

async function getStrategyTokenData(batchCall, strategyWantTokenAddresses) {
  const strategyWantTokensBatchResult = await batchCall.execute([
    {
      namespace: "tokenData",
      addresses: strategyWantTokenAddresses,
      abi: ERC20ABI,
      readMethods: [{ name: "name" }, { name: "symbol" }, { name: "decimals" }],
    },
  ]);

  const strategyTokenData = strategyWantTokensBatchResult.map((tokenDataResult) => {
    const name = tokenDataResult.name[0].value;
    const symbol = tokenDataResult.symbol[0].value;
    const decimals = parseInt(tokenDataResult.decimals[0].value, 10);
    return {
      name,
      symbol,
      symbolAlias: getTokenSymbolAlias(symbol),
      decimals,
      address: tokenDataResult.address,
    };
  });

  return strategyTokenData;
}

function setPriceFetchInterval(vaults, localCurrency, dispatch) {
  const vaultWantTokenAddresses = transform(
    vaults,
    (acc, vault) => {
      acc.push(vault.tokenAddress);
    },
    []
  );

  const dispatchFetch = () =>
    dispatch(
      actions.fetchWantTokenPrices({ vaultWantTokens: vaultWantTokenAddresses, localCurrency })
    );

  dispatchFetch();
  const interval = setInterval(() => {
    dispatchFetch();
  }, 120 * 1000);

  return interval;
}

function setUserStatsFetchInterval(userAddress, dispatch) {
  const dispatchFetch = () => dispatch(actions.fetchUserStats({ userAddress }));

  dispatchFetch();
  const interval = setInterval(() => {
    dispatchFetch();
  }, 120 * 1000);

  return interval;
}

export { initializeContractData, setPriceFetchInterval, setUserStatsFetchInterval };
