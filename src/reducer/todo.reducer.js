// @flow
import Actions from '../action/actions';

export function todo(state = { todos: [] }, action: FSAction) {
  switch (action.type) {
    case Actions.GET_TODO_LIST.SUCCESS:
      return {
        ...state,
        todos: action.payload
      };

    case Actions.UPDATE_TODO.REQUEST: {
      const udpatedTodoIndex: number = state.todos.findIndex(todo => {
        todo.id === action.payload.id;
      });
      const todos = ~udpatedTodoIndex
        ? state.todos.splice(updatedTodoIndex, 1, action.payload)
        : state.todos;
      return {
        ...state,
        todos
      };
    }

    default:
      return state;
  }
}
