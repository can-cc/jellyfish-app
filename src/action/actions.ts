import { values } from 'ramda';

const actionNames = [
  'SIGNIN',
  'GET_USER_INFO',
  'CREATE_TODO',
  'GET_TODO_LIST',
  'GET_TODO_CYCLE_STATUS_LIST',
  'UPDATE_TODO',
  'DELETE_TODO'
];

export const actions: any = actionNames.reduce((result: any, actionName: any) => {
  const REQUEST_SYMBOL = actionName + '_REQUEST';
  const SUCCESS_SYMBOL = actionName + '_SUCCESS';
  const FAILURE_SYMBOL = actionName + '_FAILURE';
  const FINISH_SYMBOL = actionName + '_FINISH';
  result[actionName] = {
    name: actionName,
    REQUEST: REQUEST_SYMBOL,
    SUCCESS: SUCCESS_SYMBOL,
    FAILURE: FAILURE_SYMBOL,
    FINISH: FINISH_SYMBOL,
    request: (payload: any, meta: any) => ({
      type: REQUEST_SYMBOL,
      payload,
      meta
    }),
    success: (payload: any, meta: any) => ({
      type: SUCCESS_SYMBOL,
      payload,
      meta
    }),
    failure: (payload: any, meta: any) => ({
      type: FAILURE_SYMBOL,
      error: true,
      payload,
      meta
    }),
    finish: (payload: any, meta: any) => {
      return {
        type: FINISH_SYMBOL,
        payload,
        meta
      };
    }
  };
  return result;
}, {});

export function makeActionRequestCollection() {
  return values(actions).reduce((result: any, actionFactor: any) => {
    result[actionFactor.name + '_REQUEST'] = actionFactor.request;
    result[actionFactor.name + '_FINISH'] = actionFactor.finish;
    return result;
  }, {});
}

export interface AppAction {
  type: string;
  payload?: any;
  meta?: any;
  error?: boolean;
}

export default actions;
