import Actions from '../action/actions';
import { GET_USER_INFO_SUCCESS } from '../action/user';

export interface AuthReducerState {
  token: string;
  username: string;
}

export function auth(state = { token: null, userId: null }, action) {
  switch (action.type) {
    // case Actions.SIGNIN.REQUEST:
    //   return {
    //     ...state,
    //     username: action.payload.username
    //   };
    case Actions.SIGNIN.SUCCESS:
      return {
        ...state,
        token: action.payload,
        userId: action.payload.id
      };

    case GET_USER_INFO_SUCCESS:
      return {
        ...state,
        userInfo: action.payload
      };
    default:
      return state;
  }
}
