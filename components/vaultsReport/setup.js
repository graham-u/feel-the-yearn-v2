import ERC20ABI from "abi/ERC20ABI.json";
import v1StrategyABI from "abi/v1StrategyMinimumABI.json";
import v1VaultABI from "abi/v1VaultABI";
import { actions } from "components/vaultsReport/slice";
import { has, forIn } from "lodash";
import getTokenSymbolAlias from "utils/getTokenSymbolAlias";

function initializeContractData(vaults, web3, strategyContractsAddedToDrizzle, dispatch) {
  vaults.forEach((vault) => {
    // Add vault contracts to drizzle.
    const vaultContract = new web3.eth.Contract(v1VaultABI, vault.address);
    drizzle.addContract({ contractName: vault.address, web3Contract: vaultContract });

    // Add strategy contracts to drizzle.
    let strategyAddress = vault.strategyAddress;

    // Annoying check to prevent trying to add dupicate strategy contract
    // due to ChainLink and aLink both pointing to same strategy.
    if (!has(strategyContractsAddedToDrizzle, strategyAddress)) {
      let strategyContract = new web3.eth.Contract(v1StrategyABI, strategyAddress);
      drizzle.addContract({ contractName: strategyAddress, web3Contract: strategyContract });
      strategyContractsAddedToDrizzle[strategyAddress] = strategyContract;
    }
  });

  // Fetch and store strategy token data not available from registry.
  (async () => {
    const strategyTokens = await getStrategyTokens(strategyContractsAddedToDrizzle, web3);
    dispatch(actions.getStrategyTokensSuccess(strategyTokens));
  })();

  dispatch(actions.addContractsToDrizzleSuccess());
}

async function getStrategyTokens(strategyContractsAddedToDrizzle, web3) {
  const createStrategyTokenPromise = (strategyContract) => {
    return new Promise((resolve) => {
      (async () => {
        const strategyTokenAddress = await strategyContract.methods.want().call();
        const strategyTokenContract = new web3.eth.Contract(ERC20ABI, strategyTokenAddress);
        const strategyToken = {
          name: await strategyTokenContract.methods.name().call(),
          symbol: await strategyTokenContract.methods.symbol().call(),
          decimals: await strategyTokenContract.methods.decimals().call(),
          address: strategyTokenAddress,
        };

        // Add symbolAliases so we can use shorter symbols e.g. yCRV => yDAI+yUSDC+yUSDT+yTUSD
        strategyToken.symbolAlias = getTokenSymbolAlias(strategyToken.symbol);

        resolve(strategyToken);
      })();
    });
  };

  let strategyTokenPromises = [];
  forIn(strategyContractsAddedToDrizzle, (strategyContract) => {
    strategyTokenPromises.push(createStrategyTokenPromise(strategyContract));
  });

  return await Promise.all(strategyTokenPromises);
}

function setPriceFetchInterval(vaults, dispatch) {
  const vaultWantTokens = vaults.map((vault) => vault.tokenAddress);
  const dispatchFetch = () => dispatch(actions.fetchWantTokenPrices({ vaultWantTokens }));

  dispatchFetch();
  const interval = setInterval(() => {
    dispatchFetch();
  }, 120 * 1000);

  return interval;
}

export { initializeContractData, setPriceFetchInterval };
