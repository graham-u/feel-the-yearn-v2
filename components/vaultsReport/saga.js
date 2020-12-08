import { reduce, mapValues, isEmpty, keyBy } from "lodash";
import { takeEvery, call, put, all } from "redux-saga/effects";
import { getContractAddressFromKey } from "utils/contractKey";
import getTokenSymbolAlias from "utils/getTokenSymbolAlias";
import normalizedValue from "utils/normalizedValue";
import request from "utils/request";
import { actions } from "./slice";

function* fetchVaults() {
  try {
    let vaults = yield call(request, "https://api.yearn.tools/vaults");
    // Swap in our own tokenSymbolAliases as some aliases in the vault differ
    // from whats seen on the official site.
    vaults = vaults.map((vault) => {
      return {
        ...vault,
        tokenSymbolAlias: getTokenSymbolAlias(vault.tokenSymbol),
      };
    });

    // Transform into object keyed by vault address
    vaults = keyBy(vaults, "address");

    yield put(actions.fetchVaultsSuccess({ vaults }));
  } catch (error) {
    console.log(error);
    yield put(actions.fetchVaultsFailure());
  }
}

function* fetchWantTokenPrices(action) {
  const tokenAddresses = action.payload.vaultWantTokens;
  const vsCurrency = (action.payload.localCurrency ?? "USD").toLowerCase();
  const uri = `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=TOKEN_ADDRESS&vs_currencies=${vsCurrency}`;

  let priceCalls = {};
  tokenAddresses.forEach((address) => {
    priceCalls[address] = call(request, uri.replace("TOKEN_ADDRESS", address));
  });

  try {
    let priceResults = yield all(priceCalls);

    // CoinGecko API returns the price keyed by the address (lower case), so we need to tidy the results before storing.
    priceResults = mapValues(priceResults, (priceResult, key) => {
      return priceResult[key.toLowerCase()][vsCurrency];
    });

    yield put(actions.fetchWantTokenPricesSuccess(priceResults));
  } catch (error) {
    console.log(error);
    yield put(actions.fetchWantTokenPricesFailure());
  }
}

function* fetchUserStats(action) {
  const userAddress = action.payload.userAddress;
  const uri = `https://api.yearn.tools/user/${userAddress}/vaults/statistics`;

  try {
    let userStats = yield call(request, uri);

    // Transform array of stats into object keyed by vaultAddress
    userStats = reduce(
      userStats,
      (result, vaultStats) => {
        result[vaultStats.vaultAddress] = vaultStats;
        return result;
      },
      {}
    );

    yield put(actions.fetchUserStatsSuccess(userStats));
  } catch (error) {
    console.log(error);
    yield put(actions.fetchUserStatsFailure());
  }
}

function* fetchVaultsApy() {
  const uri = `https://api.yearn.tools/vaults/apy`;

  try {
    let vaultsApyStats = yield call(request, uri);

    // Transform array of stats into object keyed by vaultAddress
    vaultsApyStats = reduce(
      vaultsApyStats,
      (result, vaultApyStats) => {
        result[vaultApyStats.address] = vaultApyStats;
        return result;
      },
      {}
    );

    yield put(actions.fetchVaultsApySuccess(vaultsApyStats));
  } catch (error) {
    console.log(error);
    yield put(actions.fetchVaultsApyFailure());
  }
}

function* updatePricePerFullShare(vaultAddress, pricePerFullShare) {
  const normalizedPricePerFullShare = normalizedValue(pricePerFullShare, 18);
  yield put(
    actions.updatePricePerFullShare({
      vaultAddress,
      pricePerFullShare: normalizedPricePerFullShare,
    })
  );
}

const isVaultHoldingsUpdate = (action) => {
  return action.variable === "balance" && action.name.startsWith("vault:");
};

const isStrategyHoldingsUpdate = (action) => {
  return action.variable === "balanceOf" && action.name.startsWith("strategy:");
};

const isUserHoldingsUpdate = (action) => {
  return (
    action.variable === "balanceOf" && action.name.startsWith("vault:") && !isEmpty(action.args)
  );
};

const isPricePerFullShareUpdate = (action) => {
  return action.variable === "getPricePerFullShare";
};

/*
 * Receives all GOT_CONTRACT_VAR actions from drizzle, determines their meaning and delegates
 * to various handlers.
 */
function* dispatchContactVariableUpdateHandler(action) {
  if (isVaultHoldingsUpdate(action)) {
    const vaultAddress = getContractAddressFromKey(action.name);
    yield put(actions.receivedRawVaultHoldings({ vaultAddress, rawHoldings: action.value }));
  }

  if (isStrategyHoldingsUpdate(action)) {
    const strategyAddress = getContractAddressFromKey(action.name);
    yield put(actions.receivedRawStrategyHoldings({ strategyAddress, rawHoldings: action.value }));
  }

  if (isUserHoldingsUpdate(action)) {
    const vaultAddress = getContractAddressFromKey(action.name);
    yield put(actions.receivedRawUserYvHoldings({ vaultAddress, rawYvHoldings: action.value }));
  }

  if (isPricePerFullShareUpdate(action)) {
    const vaultAddress = getContractAddressFromKey(action.name);
    const rawPricePerFullShare = action.value;
    yield* updatePricePerFullShare(vaultAddress, rawPricePerFullShare);
  }
}

export default function* vaultsReportSaga() {
  yield takeEvery(actions.fetchVaults, fetchVaults);
  yield takeEvery(actions.fetchWantTokenPrices, fetchWantTokenPrices);
  yield takeEvery(actions.fetchUserStats, fetchUserStats);
  yield takeEvery(actions.fetchVaultsApy, fetchVaultsApy);
  yield takeEvery("GOT_CONTRACT_VAR", dispatchContactVariableUpdateHandler);
}
