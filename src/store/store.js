import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createEpicMiddleware } from 'redux-observable';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

import { reducers } from '../reducer';
import rootEpic from '../epic';

const persistConfig = {
  key: 'root',
  storage
};

function setupStore() {
  const persistedReducer = persistReducer(persistConfig, combineReducers(reducers));
  const epicMiddleware = createEpicMiddleware(rootEpic);
  const store = createStore(persistedReducer, applyMiddleware(epicMiddleware));
  return store;
}

export default () => {
  const store = setupStore();
  const persistor = persistStore(store);
  return { store, persistor };
};
