// @flow
import Actions from '../action/actions';
import { normalize, schema } from 'normalizr';
import R from 'ramda';

const STodo = new schema.Entity('todo');
const STodos = new schema.Array(STodo);

export function todo(
  state = { result: [], entities: { todo: {} }, tempIdCursor: 0 },
  action: FSAction
) {
  switch (action.type) {
    case Actions.GET_TODO_LIST.REQUEST:
      return {
        ...state,
        refreshing: true
      };

    case Actions.GET_TODO_LIST.SUCCESS: {
      const normalizedData = normalize(action.payload, STodos);
      return {
        ...state,
        refreshing: false,
        result: normalizedData.result,
        entities: {
          todo: {
            ...state.entities.todo,
            ...normalizedData.entities.todo
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

    /* case Actions.CREATE_TODO.REQUEST: {
       *   return {
       *     ...state,
       *     entities: {
       *       todo: {
       *         ...state.entities.todo,
       *         ['[TEMP]' + state.tempIdCursor]: action.payload
       *       }
       *     },
       *     tempIdCursor: state.tempIdCursor + 1
       *   };
       * }
       */
    case Actions.CREATE_TODO.SUCCESS: {
      console.log('hihihhhhhhhhhhhh');
      console.log(action);
      const normalizedData = normalize(action.payload, STodo);
      console.log('normalizeddata', normalizedData);
      return {
        ...state,
        result: state.result.concat(normalizedData.result),
        entities: {
          ...state.entities,
          ...normalizedData.entities
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
              ...state.entities.todo[action.payload.id],
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
