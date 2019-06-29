import { compose, createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import reduxReset from 'redux-reset';
import logger from 'redux-logger';

import { reducers } from '../reducer';
import rootEpic from '../epic';
import hardSet from 'redux-persist/es/stateReconciler/hardSet';

const persistConfig = {
  key: 'root',
  timeout: 100000,
  debounce: 100,
  storage,
  stateReconciler: hardSet
};

function setupStore() {
  const persistedReducer = persistReducer(persistConfig, combineReducers(reducers));
  const epicMiddleware = createEpicMiddleware();

  const store = createStore(
    persistedReducer,
    compose(
      applyMiddleware(epicMiddleware, logger),
      reduxReset()
    )
  );

  return { store, epicMiddleware };
}

export default () => {  
  const { store, epicMiddleware } = setupStore();

  const persistor = persistStore(store);

  // store.dispatch({ type: 'RESET' });
  // persistor.purge();

  epicMiddleware.run(rootEpic as any);
  return { store, persistor };
};