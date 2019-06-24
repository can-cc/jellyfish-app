
export class LoginAction {
  readonly type = 'LOGIN';

  constructor(
    public payload: {
      username: string;
      password: string;
    }
  ) {}
}
