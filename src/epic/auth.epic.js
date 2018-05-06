import { ajax } from 'rxjs/observable/dom/ajax';
import Actions from '../action/actions';
import axios from 'axios';

import 'rxjs/add/operator/mergeMap';

export const signin = action$ => {
  return action$.ofType(Actions.SIGNIN.REQUEST).mergeMap(action => {
    return axios
      .post('/user/signin', action.playload)
      .then(response => Actions.SIGN_IN.success(response.data))
      .catch(Actions.SIGN_IN.failure);
  });
};
