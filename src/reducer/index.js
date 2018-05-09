import { merge, reduce } from 'ramda';

export const reducers = {
  ...require('./auth.reducer'),
  ...require('./todo.reducer')
};
