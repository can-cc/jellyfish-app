import { AuthReducerState } from './auth.reducer';
import { TodoReducerState } from './todo.reducer';

export interface AppRootState {
  auth: AuthReducerState;
  todo: TodoReducerState;
}
