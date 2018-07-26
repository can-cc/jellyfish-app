import { ajax } from 'rxjs/observable/dom/ajax';
import Actions from '../action/actions';
import axios from 'axios';
import { API_BASE } from '../env/env';
import { Toast } from 'antd-mobile-rn';
import { Observable } from 'rxjs/Observable';

import { Notifications } from 'expo';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/of';

export const CREATE_TODO = action$ => {
  return action$.ofType(Actions.CREATE_TODO.REQUEST).mergeMap(action => {
    if (action.payload.deadline) {
      const localNotification = {
        title: '你的任务快到到期了, 完成了吗？',
        body: `${action.payload.content}`,
        ios: {
          sound: true
        }
      };
      let t = new Date(action.payload.deadline);
      const schedulingOptions = {
        time: t
      };
      Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions);
    }

    return axios
      .post(`${API_BASE}/auth/todo`, action.payload)
      .then(response => {
        return Actions.CREATE_TODO.success({
          ...response.data,
          ...action.payload
        });
      })
      .catch(caught => {
        /* Toast.fail('\n新建失败，请重试'); */
        return Actions.CREATE_TODO.failure(action.payload, caught);
      });
  });
};

/* export const CREATE_TODO_SUCCESS = action$ => {
 *   return action$.ofType(Actions.CREATE_TODO.SUCCESS).do(action => {
 *   });
 * };
 *  */
export const UPDATE_TODO = action$ => {
  return action$
    .ofType(Actions.UPDATE_TODO.REQUEST)
    .distinctUntilChanged() // TODO distinctUntilChanged mix debounceTime
    /* .debounceTime(1000) */ .mergeMap(action => {
      return axios
        .put(`${API_BASE}/auth/todo/${action.payload.id}`, action.payload)
        .then(response => Actions.UPDATE_TODO.success(response.data))
        .catch(Actions.UPDATE_TODO.failure);
    });
};

export const DELETE_TODO = action$ => {
  return action$.ofType(Actions.DELETE_TODO.REQUEST).mergeMap(action => {
    return axios
      .delete(`${API_BASE}/auth/todo/${action.payload.id}`)
      .then(response => Actions.DELETE_TODO.success({ id: action.payload.id }))
      .catch(Actions.DELETE_TODO.failure);
  });
};

export const GET_TODO_LIST = action$ => {
  return action$.ofType(Actions.GET_TODO_LIST.REQUEST).mergeMap(action => {
    return axios
      .get(`${API_BASE}/auth/todo?userId=${action.payload.userId}`)
      .then(response => {
        return Actions.GET_TODO_LIST.success(response.data);
      })
      .catch(Actions.GET_TODO_LIST.failure);
  });
};
