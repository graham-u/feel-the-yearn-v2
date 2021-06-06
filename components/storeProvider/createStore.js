import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { reducer as connectionProviderReducer } from "components/connectionProvider/slice";
import settingsSaga from "components/pageContainer/header/settingsPanel/saga";
import { reducer as settingsReducer } from "components/pageContainer/header/settingsPanel/slice";
import notificationsSaga from "components/pageContainer/notifications/saga";
import { reducer as notificationsReducer } from "components/pageContainer/notifications/slice";
import vaultsReportSaga from "components/vaultsReport/saga";
import { reducer as vaultsReportReducer } from "components/vaultsReport/slice";
import createSagaMiddleware from "redux-saga";

const reducer = {
  vaultsReport: vaultsReportReducer,
  walletConnection: connectionProviderReducer,
  settings: settingsReducer,
  notifications: notificationsReducer,
};

function createStore() {
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  const middlewares = [sagaMiddleware];

  const defaultMiddleWare = getDefaultMiddleware();

  let devTools = false;
  // Any devTools configuration can be done here.
  if (process.env.NODE_ENV !== "production") {
    devTools = {};
  }

  const store = configureStore({
    reducer,
    middleware: [...defaultMiddleWare, ...middlewares],
    devTools: devTools,
  });

  sagaMiddleware.run(settingsSaga);
  sagaMiddleware.run(vaultsReportSaga);
  sagaMiddleware.run(notificationsSaga);

  return store;
}

export default createStore;
