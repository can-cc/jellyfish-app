// @flow
import Actions from '../action/actions';

export function todo(state = { todos: [] }, action: FSAction) {
  switch (action.type) {
    case Actions.GET_TODO_LIST.SUCCESS:
      return {
        ...state,
        todos: action.payload
      };
    default:
      return state;
  }
}
