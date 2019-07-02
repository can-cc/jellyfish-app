import { AppAction } from './actions';
import { UserInfo } from '../typing/user';

export const GET_USER_INFO_REQUEST = 'GET_USER_INFO_REQUEST';
export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_FAILURE = 'GET_USER_INFO_FAILURE';

export function getUserInfoRequest(userId: string): AppAction {
  return {
    type: GET_USER_INFO_REQUEST,
    payload: userId
  };
}

export function getUserInfoSuccess(userInfo: UserInfo): AppAction {
  return {
    type: GET_USER_INFO_SUCCESS,
    payload: userInfo
  };
}

export function getUserInfoFailure(error): AppAction {
  return {
    type: GET_USER_INFO_FAILURE,
    payload: error,
    error: true
  };
}
