import { compose, createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { persistStore, persistReducer, Persistor } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import reduxReset from 'redux-reset';
import logger from 'redux-logger';
import axios from 'axios'

import rootEpic from '../epic';
import hardSet from 'redux-persist/es/stateReconciler/hardSet';
import { reducers } from '../reducer/reducer';
import { API_BASE } from "../../env/env";
import axiosMiddleware from "redux-axios-middleware";

const persistConfig = {
  key: 'root',
  timeout: 30000,
  debounce: 100,
  storage,
  stateReconciler: hardSet
};

const client = axios.create({ //all axios can be used, shown in axios documentation
  baseURL: API_BASE,
  responseType: 'json'
});

function setupStore() {
  const persistedReducer = persistReducer(persistConfig, combineReducers(reducers));
  const epicMiddleware = createEpicMiddleware();

  const store = createStore(persistedReducer, compose(applyMiddleware(axiosMiddleware(client, {
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

