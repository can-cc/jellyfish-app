//
import Actions from '../action/actions';

export function auth(state = { token: null, userId: null }, action) {
  switch (action.type) {
    case Actions.SIGNIN.REQUEST:
      return {
        ...state,
        username: action.payload.username
      };
    case Actions.SIGNIN.SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.id
      };

    case Actions.GET_USER_INFO.SUCCESS:
      return {
        ...state,
        avatar: action.payload.avatar
      };
    default:
      return state;
  }
}
