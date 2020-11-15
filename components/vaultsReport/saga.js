import { takeEvery, call, put, all } from "redux-saga/effects";
import request from "utils/request";
import { actions } from "./slice";
import { transform } from "lodash";

function* fetchVaults() {
  try {
    const data = yield call(request, "https://api.yearn.tools/vaults");
    yield put(actions.fetchVaultsSuccess(data));
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

    // CoinGecko API returns the price keyed by the address (lower case), so we need to tidy the
    // results before storing.
    priceResults = transform(
      priceResults,
      function (result, value, key) {
        result[key] = value[key.toLowerCase()][vsCurrency];
      },
      {}
    );

    yield put(actions.fetchWantTokenPricesSuccess(priceResults));
  } catch (error) {
    console.log(error.message);
    yield put(actions.fetchWantTokenPricesFailure({ error: error.message }));
  }
}

export default function* vaultsReportSaga() {
  yield takeEvery(actions.fetchVaults, fetchVaults);
  yield takeEvery(actions.fetchWantTokenPrices, fetchWantTokenPrices);
}
