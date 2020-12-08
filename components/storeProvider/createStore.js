import drizzleMW from "@drizzle/store/src/drizzle-middleware";
import drizzleReducers from "@drizzle/store/src/reducer";
import drizzleSagas from "@drizzle/store/src/rootSaga";
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
  // We have to put all of drizzle's reducers at the root as
  // DrizzleContract.cacheCallFunction expects to find contract key there
  // on lines like contract.store.getState().contracts[contractName]
  ...drizzleReducers,
};

function createStore() {
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  const middlewares = [sagaMiddleware, drizzleMW];

  const defaultMiddleWare = getDefaultMiddleware({
    serializableCheck: {
      // Don't run serializableCheck on these action types.
      // Drizzle adds various unserializable values to it's actions so we
      // prevent warnings about these in the console.
      ignoredActions: [
        "DRIZZLE_INITIALIZING",
        "CONTRACT_INITIALIZING",
        "CONTRACT_SYNCING",
        "BLOCK_RECEIVED",
        "BLOCKS_LISTENING",
        "CALL_CONTRACT_FN",
      ],
    },
  });

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
  drizzleSagas.forEach((saga) => sagaMiddleware.run(saga));

  return store;
}

export default createStore;
