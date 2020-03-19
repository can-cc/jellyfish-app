export const SHOW_TOAST_REQUEST = 'SHOW_TOAST_REQUEST';

export function showToastRequest(: DeleteTodoInput): AppAction {
  return {
    type: SHOW_TOAST_REQUEST,
    payload: deleteTodoInput
  };
}

export function deleteTodoSuccess(): AppAction {
  return {
    type: DELETE_TODO_REQUEST_SUCCESS
  };
}

export function deleteTodoFailure(): AppAction {
  return {
    type: DELETE_TODO_REQUEST_FAILURE
  };
}
