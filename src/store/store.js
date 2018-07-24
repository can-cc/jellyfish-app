import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createEpicMiddleware } from 'redux-observable';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import reduxReset from 'redux-reset';
import logger from 'redux-logger';
import epicAdapterService from '../service/single/epic-adapter.service';

import { reducers } from '../reducer';
import rootEpic from '../epic';

const persistConfig = {
  key: 'jellyfish',
  storage
};

function setupStore() {
  const persistedReducer = persistReducer(persistConfig, combineReducers(reducers));
  const epicMiddleware = createEpicMiddleware();

  const store = createStore(
    persistedReducer,
    compose(applyMiddleware(epicMiddleware, logger), reduxReset())
  );

  return { store, epicMiddleware };
}

export default () => {
  const { store, epicMiddleware } = setupStore();

  const persistor = persistStore(store, null, () => {});

  /* store.dispatch({ type: 'RESET' });
   * persistor.purge();
   */
  epicMiddleware.run(rootEpic, {
    /* adapter: epicAdapterService */
  });
  return { store, persistor };
};
