import { ajax } from 'rxjs/observable/dom/ajax';
import Actions from '../action/actions';
import axios from 'axios';
import { setupAxiosJwtHeader } from '../helper/http-intercetor';
import { API_BASE } from '../env/env';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/ignoreElements';

export const signin = action$ => {
  return action$.ofType(Actions.SIGNIN.REQUEST).mergeMap(action => {
    return axios
      .post(`${API_BASE}/auth/signin`, action.payload)
      .then(response => {
        setupAxiosJwtHeader(response.data.token);
        return Actions.SIGNIN.success(response.data);
      })
      .catch(Actions.SIGNIN.failure);
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
