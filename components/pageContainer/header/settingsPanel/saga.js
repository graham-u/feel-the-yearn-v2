import { getSettingsPanelOpen } from "components/pageContainer/header/settingsPanel/selectors";
import { takeEvery, spawn, select } from "redux-saga/effects";
import { saveSetting } from "utils/settings";

function* saveToLocalStorage(action) {
  switch (action.type) {
    case "settings/themeSelected": {
      saveSetting("theme", action.payload);
      break;
    }
    case "settings/vaultSortFieldSelected": {
      saveSetting("vaultSortField", action.payload);
      break;
    }
    case "settings/panelToggled": {
      const panelIsOpen = yield select(getSettingsPanelOpen);
      saveSetting("settingsPanelOPen", panelIsOpen);
      break;
    }
    case "settings/vaultVisibilitySelected": {
      saveSetting("vaultVisibility", action.payload);
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
