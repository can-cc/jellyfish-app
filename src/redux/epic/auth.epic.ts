import Actions from '../action/actions';
import axios from 'axios';
import { setupAxiosJwtHeader } from '../../helper/http-intercetor';
import { API_BASE } from '../../env/env';
import Toast from 'react-native-root-toast';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/ignoreElements';

import { mergeMap } from 'rxjs/operators';
import { GET_USER_INFO_REQUEST, getUserInfoSuccess, getUserInfoFailure } from '../action/user';
import { ofType } from 'redux-observable';
import { UserInfo } from '../../typing/user';
import { path } from 'ramda';
import i18n from 'i18n-js';
import { replace } from '../../navigation/RootNavigation';

export const LOGIN = (action$: any) => {
  return action$.ofType('SIGNIN').pipe(
    mergeMap((action: any) => {
      return axios
        .post(`${API_BASE}/login`, action.payload)
        .then(response => {
          setupAxiosJwtHeader(response.headers['app-authorization']);
          return Actions.SIGNIN.success(response.headers['app-authorization']);
        })
        .catch(error => {
          return Actions.SIGNIN.failure(error);
        });
    })
  );
};

export const LOGIN_SUCCESS = (action$: any) =>
  action$
    .ofType('SIGNIN_SUCCESS')
    .do(() => {
      replace('Root');
    })
    .ignoreElements();

export const LOGIN_FAILURE = (action$: any) =>
  action$
    .ofType(Actions.SIGNIN.FAILURE)
    .do(action => {
      if (path(['response', 'status'], action.payload) === 401) {
        Toast.show(i18n.t('logInAuthError'), {
          duration: Toast.durations.SHORT,
          position: 220,
          shadow: false,
          animation: true,
          hideOnPress: true,
          delay: 0
        });
        return;
      }
      Toast.show(i18n.t('logInCommonError'), {
        duration: Toast.durations.SHORT,
        position: 220,
        shadow: false,
        animation: true,
        hideOnPress: true,
        delay: 0
      });
    })
    .ignoreElements();

export const GET_USER_INFO = (action$: any) => {
  return action$.pipe(
    ofType(GET_USER_INFO_REQUEST),
    mergeMap((action: any) => {
      return axios
        .get<UserInfo>(`${API_BASE}/user/${action.payload.userId}`)
        .then(resp => {
          return getUserInfoSuccess(resp.data);
        })
        .catch(error => {
          return getUserInfoFailure(error);
        });
    })
  );
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
