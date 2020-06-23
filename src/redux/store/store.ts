import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { Persistor, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reduxReset from "redux-reset";
import logger from "redux-logger";

import rootEpic from "../epic";
import hardSet from "redux-persist/es/stateReconciler/hardSet";
import { reducers } from "../reducer/reducer";
import axiosMiddleware from "redux-axios-middleware";
import { axiosClient } from "../../util/axios";

const persistConfig = {
  key: 'root',
  timeout: 30000,
  debounce: 100,
  storage,
  stateReconciler: hardSet
};

function setupStore() {
  const persistedReducer = persistReducer(persistConfig, combineReducers(reducers));
  const epicMiddleware = createEpicMiddleware();

  const store = createStore(persistedReducer, compose(applyMiddleware(axiosMiddleware(axiosClient, {
    returnRejectedPromiseOnError: true
  }), epicMiddleware, logger), reduxReset()));

  return { store, epicMiddleware };
}

export const createAppStore = () => {
  const { store, epicMiddleware } = setupStore();

  const persistor: Persistor = persistStore(store);

  // @ts-ignore
  // store.dispatch({ type: 'RESET' });
  // persistor.purge();

  epicMiddleware.run(rootEpic as any);
  return { store, persistor };
};


export const { store, persistor } = createAppStore();
