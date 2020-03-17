import Actions, { AppAction } from '../action/actions';
import axios from 'axios';
import { API_BASE } from '../env/env';
import { Notifications } from 'expo';
import Toast from 'react-native-root-toast';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/of';
import { ofType } from 'redux-observable';
import { getTodoListSuccess, DELETE_TODO_REQUEST } from '../action/todo';
import i18n from 'i18n-js';
import { mergeMap } from 'rxjs/operators';

export const CREATE_TODO = (action$: any) => {
  return action$.pipe(
    ofType(Actions.CREATE_TODO.REQUEST),
    mergeMap((action: any) => {
      // if (action.payload.deadline) {
      //   const localNotification = {
      //     title: '你的任务快到到期了, 完成了吗？',
      //     body: `${action.payload.content}`,
      //     ios: {
      //       sound: true
      //     }
      //   };
      //   let t = new Date(action.payload.deadline);
      //   const schedulingOptions = {
      //     time: t
      //   };
      //   Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions);
      // }

      return axios
        .post(`${API_BASE}/taco`, action.payload)
        .then(response => {
          return Actions.CREATE_TODO.success({
            ...response.data,
            ...action.payload
          });
        })
        .catch(caught => {
          Toast.show(i18n.t('createTodoCommonFailure'), {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            shadow: false,
            animation: true,
            hideOnPress: true,
            delay: 0,
            containerStyle: {
              zIndex: 1000000000
            }
          });
          return Actions.CREATE_TODO.failure(action.payload, caught);
        });
    })
  );
};

export const UPDATE_TODO = (action$: any) => {
  return action$
    .ofType(Actions.UPDATE_TODO.REQUEST)
    .distinctUntilChanged()
    .mergeMap((action: any) => {
      return axios
        .put(`${API_BASE}/todo/${action.payload.id}`, action.payload)
        .then(response => Actions.UPDATE_TODO.success(response.data))
        .catch(Actions.UPDATE_TODO.failure);
    });
};

export const DELETE_TODO = (action$: any) => {
  return action$.pipe(
    ofType(DELETE_TODO_REQUEST),
    mergeMap((action: any) => {
      return axios
        .delete(`${API_BASE}/todo/${action.payload.id}`)
        .then((response: any) => Actions.DELETE_TODO.success({ id: action.payload.id }))
        .catch(Actions.DELETE_TODO.failure);
    })
  );
};

export const GET_TODO_LIST = (action$: any) => {
  return action$.pipe(
    ofType(Actions.GET_TODO_LIST.REQUEST),
    mergeMap((action: AppAction) => {
      return axios
        .get(`${API_BASE}/todos`)
        .then((response: any) => {
          return getTodoListSuccess(response.data);
        })
        .catch(Actions.GET_TODO_LIST.failure);
    })
  );
};
