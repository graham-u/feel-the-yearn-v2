import { keyBy, filter } from "lodash";
import { takeEvery, call, put } from "redux-saga/effects";
import yearn from "utils/yearnSDK";
import { actions } from "./slice";

function* fetchVaults() {
  try {
    let vaults = yield call([yearn.vaults, yearn.vaults.get]);

    // Don't show vaults that have available migrations
    vaults = filter(vaults, (vault) => vault.metadata.migrationAvailable === false);

    // Transform into object keyed by vault address
    vaults = keyBy(vaults, "address");

    yield put(actions.fetchVaultsSuccess({ vaults }));
  } catch (error) {
    console.log(error);
    yield put(actions.fetchVaultsFailure());
  }
}

function* fetchTokens() {
  try {
    let tokens = yield call([yearn.vaults, yearn.vaults.tokens]);

    // Transform into object keyed by vault address
    tokens = keyBy(tokens, "address");

    yield put(actions.fetchTokensSuccess({ tokens }));
  } catch (error) {
    console.log(error);
    yield put(actions.fetchUserPositionsFailure());
  }
}

function* fetchUserPositions(action) {
  const userAddress = action.payload.userAddress;

  try {
    let userPositions = yield call(
      [yearn.earnings, yearn.earnings.accountAssetPositions],
      userAddress
    );

    // Transform into object keyed by vault address
    userPositions = keyBy(userPositions, "assetAddress");
    yield put(actions.fetchUserPositionsSuccess(userPositions));
  } catch (error) {
    console.log(error);
    yield put(actions.fetchUserPositionsFailure());
  }
}

export default function* vaultsReportSaga() {
  yield takeEvery(actions.fetchVaults, fetchVaults);
  yield takeEvery(actions.fetchTokens, fetchTokens);
  yield takeEvery(actions.fetchUserPositions, fetchUserPositions);
}
