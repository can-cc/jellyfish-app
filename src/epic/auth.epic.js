import { ajax } from 'rxjs/observable/dom/ajax';
import Actions from '../action/actions';
import axios from 'axios';
import { setupAxiosJwtHeader } from '../helper/http-intercetor';
import { API_BASE } from '../env/env';
import NavigationService from '../service/single/navigation.service';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/ignoreElements';

export const SIGNIN = (action$, x, x1, x2) => {
  return action$.ofType(Actions.SIGNIN.REQUEST).mergeMap(action => {
    /* removeAxiosJwtHeader(); */
    return axios
      .post(`${API_BASE}/signin`, action.payload)
      .then(response => {
        setupAxiosJwtHeader(response.data.token);
        return Actions.SIGNIN.success(response.data);
      })
      .catch(error => {
        return Actions.SIGNIN.failure(error);
      });
  });
};

export const SIGNIN_SUCCESS = action$ =>
  action$
    .ofType(Actions.SIGNIN.SUCCESS)
    .do(() => {
      NavigationService.navigate('Main');
    })
    .ignoreElements();

export const GET_USER_INFO = action$ => {
  return action$.ofType(Actions.GET_USER_INFO.REQUEST).mergeMap(action => {
    return axios
      .get(`${API_BASE}/auth/user/${action.payload.userId}`)
      .then(resp => {
        return Actions.GET_USER_INFO.success(resp.data);
      })
      .catch(Actions.GET_USER_INFO.failure);
  });
};

export const REHYDRATE = action$ => {
  return action$
    .ofType('persist/REHYDRATE')
    .do(action => {
      if (action.payload) {
        setupAxiosJwtHeader(action.payload.auth.token);
      }
    })
    .ignoreElements();
};
