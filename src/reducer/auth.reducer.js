// @flow
import Actions from '../action/actions';

export function auth(state = { token: null, userId: null }, action: FSAction) {
  switch (action.type) {
    case Actions.SIGNIN.SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.id
      };
    default:
      return state;
  }
}
