import Actions from '../action/actions';
import { normalize } from 'normalizr';
import { UPDATE_TODO_REQUEST } from '../action/todo';
import { ITodo } from '../../typing/todo';
import { BoxListSchema, TodoListSchema } from "../../schema/todo.schema";
import { IBox } from "../../typing/box";

interface TodoMap {
  [key: string]: ITodo;
}

interface BoxMap {
  [key: string]: IBox;
}

export interface TodoReducerState {
  refreshing: boolean;
  showDone: boolean;
  boxId: string;
  entities: {
    box: BoxMap;
    todo: TodoMap;
  };
}

const initState: TodoReducerState = {
  refreshing: false,
  boxId: '@ALL',
  showDone: false,
  entities: {
    box: {},
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

    case `GET_TODO_LIST_SUCCESS`: {
      const todos: ITodo[] = action.payload.data;
      const normalized = normalize(todos, TodoListSchema);
      return {
        ...state,
        refreshing: false,
        entities: {
          ...state.entities,
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

    case 'SELECT_BOX_ID': {
      return {
        ...state,
          boxId: action.payload
      }
    }

    case UPDATE_TODO_REQUEST: {
      return {
        ...state,
        entities: {
          ...state.entities,
          todo: {
            ...state.entities.todo,
            [action.payload.id]: action.payload
          }
        }
      };
    }

    case Actions.DELETE_TODO.REQUEST: {
      return {
        ...state,
        entities: {
          ...state.entities,
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

    case 'QUERY_BOX_LIST_SUCCESS': {
      const boxes = action.payload.data;
      const normalized = normalize(boxes, BoxListSchema);
      return {
        ...state,
        entities: {
          ...state.entities,
          box: {
            ...state.entities.box,
            ...normalized.entities.Box
          }
        }
      }
    }

    case 'SWITCH_TODO_LIST_SHOW_DONE': {
      return {
        ...state,
        showDone: action.payload
      };
    }

    default:
      return state;
  }
}
