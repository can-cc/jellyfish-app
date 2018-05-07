import { ajax } from 'rxjs/observable/dom/ajax';
import Actions from '../action/actions';
import axios from 'axios';
import { API_BASE } from '../env/env';

import 'rxjs/add/operator/mergeMap';

export const signin = action$ => {
  return action$.ofType(Actions.SIGNIN.REQUEST).mergeMap(action => {
    console.log(`${API_BASE}/signin`, action);
    return axios
      .post(`${API_BASE}/signin`, action.payload)
      .then(response => Actions.SIGNIN.success(response.data))
      .catch(Actions.SIGNIN.failure);
  });
};
