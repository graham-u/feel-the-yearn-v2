import { takeEvery, call, put } from "redux-saga/effects";
import request from "utils/request";
import { actions } from "./slice";

function* fetchVaults() {
  try {
    const data = yield call(request, "https://api.yearn.tools/vaults");
    yield put(actions.fetchVaultsSuccess(data));
  } catch (error) {
    console.log(error.message);
    yield put(actions.fetchVaultsFailure({ error: error.message }));
  }
}

export default function* vaultsReportSaga() {
  yield takeEvery(actions.fetchVaults, fetchVaults);
}
