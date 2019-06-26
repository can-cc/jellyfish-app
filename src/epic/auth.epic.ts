import Actions from '../action/actions';
import axios from 'axios';
import { setupAxiosJwtHeader } from '../helper/http-intercetor';
import { API_BASE } from '../env/env';
import NavigationService from '../service/single/navigation.service';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/ignoreElements';

import { mergeMap } from 'rxjs/operators';

export const SIGNIN = (action$: any) => {
  return action$.ofType('SIGNIN').pipe(
    mergeMap((action: any) => {
      return axios
        .post(`${API_BASE}/signin`, action.payload)
        .then(response => {
          setupAxiosJwtHeader(response.data.token);
          return Actions.SIGNIN.success(response.data);
        })
        .catch(error => {
          return Actions.SIGNIN.failure(error);
        });
    })
  );
};

export const SIGNIN_SUCCESS = (action$: any) =>
  action$
    .ofType(Actions.SIGNIN.SUCCESS)
    .do(() => {
      NavigationService.navigate('Main');
    })
    .ignoreElements();

export const SIGNIN_FAILURE = (action$: any) =>
  action$
    .ofType(Actions.SIGNIN.FAILURE)
    .do(() => {
      // Toast.fail('\n登录失败，请重试');
    })
    .ignoreElements();

export const GET_USER_INFO = (action$: any) => {
  return action$.ofType(Actions.GET_USER_INFO.REQUEST).mergeMap((action: any) => {
    return axios
      .get(`${API_BASE}/auth/user/${action.payload.userId}`)
      .then(resp => {
        return Actions.GET_USER_INFO.success(resp.data);
      })
      .catch(Actions.GET_USER_INFO.failure);
  });
};

export const REHYDRATE = (action$: any) => {
  return action$
    .ofType('persist/REHYDRATE')
    .do((action: any) => {
      if (action.payload) { 
        setupAxiosJwtHeader(action.payload.auth.token);
      }
    })
    .ignoreElements();
};
