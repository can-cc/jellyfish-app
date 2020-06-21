import { AppAction } from '../action/actions';

export function toast(
  state: {
    message: string | null;
  } = { message: null },
  action: AppAction
) {
  switch (action.type) {
    default:
      return state;
  }
}
