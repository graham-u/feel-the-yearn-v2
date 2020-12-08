import { takeEvery, spawn } from "redux-saga/effects";
import { saveSetting } from "utils/settings";

function* saveToLocalStorage(action) {
  switch (action.type) {
    case "settings/localCurrencySelected": {
      saveSetting("localCurrency", action.payload);
      break;
    }
    case "settings/themeSelected": {
      saveSetting("theme", action.payload);
      break;
    }
    case "settings/vaultSortFieldSelected": {
      saveSetting("vaultSortField", action.payload);
      break;
    }
  }
}

function* persistSetting(action) {
  yield spawn(saveToLocalStorage, action);
}

export default function* settingsSaga() {
  yield takeEvery((action) => action.type.startsWith("settings/"), persistSetting);
}
