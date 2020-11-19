import { reduce, mapValues, sortBy } from "lodash";
import { takeEvery, call, put, all } from "redux-saga/effects";
import getTokenSymbolAlias from "utils/getTokenSymbolAlias";
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

    // Sort alphabetically by alias.
    vaults = sortBy(vaults, [
      function (vault) {
        return vault.vaultAlias.toLowerCase();
      },
    ]);

    yield put(actions.fetchVaultsSuccess(vaults));
  } catch (error) {
    console.log(error.message);
    yield put(actions.fetchVaultsFailure({ error: error.message }));
  }
}

function* fetchWantTokenPrices(action) {
  const tokenAddresses = action.payload.vaultWantTokens;
  const vsCurrency = action.payload.vsCurrency ?? "usd";
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
    console.log(error.message);
    yield put(actions.fetchWantTokenPricesFailure({ error: error.message }));
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
    console.log(error.message);
    yield put(actions.fetchUserStatsFailure({ error: error.message }));
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
    console.log(error.message);
    yield put(actions.fetchVaultsApyFailure({ error: error.message }));
  }
}

export default function* vaultsReportSaga() {
  yield takeEvery(actions.fetchVaults, fetchVaults);
  yield takeEvery(actions.fetchWantTokenPrices, fetchWantTokenPrices);
  yield takeEvery(actions.fetchUserStats, fetchUserStats);
  yield takeEvery(actions.fetchVaultsApy, fetchVaultsApy);
}
