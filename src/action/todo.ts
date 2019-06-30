import { Todo, CreateTodoInput, UpdateTodoInput } from '../typing/todo';
import { AppAction } from './actions';

export const GET_TODO_LIST_SUCCESS = 'GET_TODO_LIST_SUCCESS';

export function getTodoListSuccess(todos: Todo[]): AppAction {
  return {
    type: GET_TODO_LIST_SUCCESS,
    payload: todos
  };
}


export const CREATE_TODO_REQUEST = 'CREATE_TODO_REQUEST';
export const CREATE_TODO_REQUEST_SUCCESS = 'CREATE_TODO_REQUEST_SUCCESS';
export const CREATE_TODO_REQUEST_FAILURE = 'CREATE_TODO_REQUEST_FAILURE';

export function createTodoRequest(createTodoInput: CreateTodoInput): AppAction {
  return {
    type: CREATE_TODO_REQUEST,
    payload: createTodoInput
  }
}

export function createTodoSuccess(): AppAction {
  return {
    type: CREATE_TODO_REQUEST_SUCCESS
  }
}

export const UPDATE_TODO_REQUEST = 'UPDATE_TODO_REQUEST';
export const UPDATE_TODO_REQUEST_SUCCESS = 'UPDATE_TODO_REQUEST_SUCCESS';
export const UPDATE_TODO_REQUEST_FAILURE = 'UPDATE_TODO_REQUEST_FAILURE';

export function updateTodoRequest(updateTodoInput: UpdateTodoInput): AppAction {
  return {
    type: UPDATE_TODO_REQUEST,
    payload: updateTodoInput
  }
}


export function updateTodoSuccess(): AppAction {
  return {
    type: CREATE_TODO_REQUEST_SUCCESS
  }
}