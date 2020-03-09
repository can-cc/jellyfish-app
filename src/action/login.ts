export function signin(username: string, password: string, successCallback) {
  return {
    type: 'SIGNIN',
    payload: {
      username,
      password
    },
    meta: {
      successCallback
    }
  };
}
