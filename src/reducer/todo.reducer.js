// @flow
import Actions from '../action/actions';
import R from 'ramda';

export function todo(state = { todos: [] }, action: FSAction) {
  switch (action.type) {
    case Actions.GET_TODO_LIST.SUCCESS:
      return {
        ...state,
        todos: action.payload
      };

    case Actions.UPDATE_TODO.REQUEST: {
      const udpatedTodoIndex: number = R.findIndex(todo => {
        return todo.id === action.payload.id;
      })(state.todos);
      const todos = ~udpatedTodoIndex
        ? R.update(udpatedTodoIndex, action.payload, state.todos)
        : state.todos;
      return {
        ...state,
        todos
      };
    }

    case Actions.DELETE_TODO.REQUEST: {
      const udpatedTodoIndex: number = R.findIndex(todo => {
        return todo.id === action.payload.id;
      })(state.todos);

      const todos = ~udpatedTodoIndex
        ? R.update(
            udpatedTodoIndex,
            {
              ...state.todos[udpatedTodoIndex],
              hidden: true
            },
            state.todos
          )
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
