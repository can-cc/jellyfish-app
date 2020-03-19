
// TODO typesript and move to reduer.ts


export const reducers = {
  ...require('./auth.reducer'),
  ...require('./todo.reducer'),
  ...require('./toast.reducer')
};
