import { ajax } from 'rxjs/observable/dom/ajax';
import Actions from '../action/actions';
import axios from 'axios';
import { API_BASE } from '../env/env';

import 'rxjs/add/operator/mergeMap';

export const CREATE_TODO = action$ => {
  return action$.ofType(Actions.CREATE_TODO.REQUEST).mergeMap(action => {
    return axios
      .post(`${API_BASE}/todo`, action.payload)
      .then(response => Actions.CREATE_TODO.success(response.data))
      .catch(Actions.CREATE_TODO.failure);
  });
};

export const GET_TODO_LIST = action$ => {
  return action$.ofType(Actions.GET_TODO_LIST.REQUEST).mergeMap(action => {
    return axios
      .get(`${API_BASE}/todo?userId=${action.payload.userId}`)
      .then(response => {
        return Actions.GET_TODO_LIST.success(response.data);
      })
      .catch(Actions.GET_TODO_LIST.failure);
  });
};
