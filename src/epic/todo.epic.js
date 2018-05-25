import { ajax } from 'rxjs/observable/dom/ajax';
import Actions from '../action/actions';
import axios from 'axios';
import { API_BASE } from '../env/env';
import { Toast } from 'antd-mobile';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

export const CREATE_TODO = action$ => {
  return action$.ofType(Actions.CREATE_TODO.REQUEST).mergeMap(action => {
    return axios
      .post(`${API_BASE}/todo`, action.payload)
      .then(response => Actions.CREATE_TODO.success(response.data))
      .catch(caught => {
        Toast.fail('\n新建失败，请重试');
        return Actions.CREATE_TODO.failure(caught);
      });
  });
};

export const UPDATE_TODO = action$ => {
  return action$
    .ofType(Actions.UPDATE_TODO.REQUEST)
    .distinctUntilChanged()
    .debounceTime(1000)
    .mergeMap(action => {
      return axios
        .put(`${API_BASE}/todo/${action.payload.id}`, action.payload)
        .then(response => Actions.UPDATE_TODO.success(response.data))
        .catch(Actions.UPDATE_TODO.failure);
    });
};

export const DELETE_TODO = action$ => {
  return action$.ofType(Actions.DELETE_TODO.REQUEST).mergeMap(action => {
    return axios
      .delete(`${API_BASE}/todo/${action.payload.id}`)
      .then(response => Actions.DELETE_TODO.success({ id: action.payload.id }))
      .catch(Actions.DELETE_TODO.failure);
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
