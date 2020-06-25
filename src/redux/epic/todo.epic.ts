import Actions  from '../action/actions';
import axios from 'axios';
import { API_BASE } from '../../env/env';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/of';

import { ofType } from 'redux-observable';
import {  DELETE_TODO_REQUEST } from "../action/todo";
import { mergeMap } from 'rxjs/operators';

export const UPDATE_TODO = (action$: any) => {
  return action$
    .ofType(Actions.UPDATE_TODO.REQUEST)
    .distinctUntilChanged()
    .mergeMap((action: any) => {
      return axios
        .put(`${API_BASE}/taco/${action.payload.id}`, action.payload)
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
