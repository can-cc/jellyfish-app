import { Todo } from '../typing/todo';
import { AppAction } from './actions';

export const GET_TODO_LIST_SUCCESS = 'GET_TODO_LIST_SUCCESS';

export function getTodoListSuccess(todos: Todo[]): AppAction {
  return {
    type: GET_TODO_LIST_SUCCESS,
    payload: todos
  };
}
