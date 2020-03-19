import Actions from '../action/actions';
import { normalize } from 'normalizr';
import { GET_TODO_LIST_SUCCESS } from '../action/todo';
import { Todo } from '../../typing/todo';
import { TodoListSchema, TodoSchema } from '../../schema/todo.schema';

interface TodoMap {
  [key: string]: Todo;
}

export interface TodoReducerState {
  refreshing: boolean;
  allTodoIDs: string[];
  entities: {
    todo: TodoMap;
  };
}

const initState: TodoReducerState = {
  refreshing: false,
  allTodoIDs: [],
  entities: {
    todo: {}
  }
};

export function todo(state: TodoReducerState = initState, action): TodoReducerState {
  switch (action.type) {
    case Actions.GET_TODO_LIST.REQUEST:
      return {
        ...state,
        refreshing: true
      };

    case GET_TODO_LIST_SUCCESS: {
      const todos: Todo[] = action.payload;
      const normalized = normalize(todos, TodoListSchema);

      return {
        ...state,
        refreshing: false,
        allTodoIDs: normalized.result,
        entities: {
          todo: {
            ...state.entities.todo,
            ...normalized.entities.todo
          }
        }
      };
    }

    case Actions.GET_TODO_LIST.FAILURE: {
      return {
        ...state,
        refreshing: false
      };
    }

    case Actions.UPDATE_TODO.REQUEST: {
      return {
        ...state,
        entities: {
          todo: {
            ...state.entities.todo,
            [action.payload.id]: action.payload
          }
        }
      };
    }

    case Actions.CREATE_TODO.SUCCESS: {
      const normalizedData = normalize(action.payload, TodoSchema);
      return {
        ...state,
        allTodoIDs: state.allTodoIDs.concat(normalizedData.result),
        entities: {
          todo: {
            ...state.entities.todo,
            ...normalizedData.entities.todo
          }
        }
      };
    }

    case Actions.DELETE_TODO.REQUEST: {
      return {
        ...state,
        entities: {
          todo: {
            ...state.entities.todo,
            [action.payload.id]: {
              ...(<any>state).entities.todo[action.payload.id],
              hidden: true
            }
          }
        }
      };
    }

    default:
      return state;
  }
}
