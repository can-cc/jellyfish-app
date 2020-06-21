import axios, { AxiosResponse } from 'axios';
import { navigate } from '../navigation/RootNavigation';
import { store } from '../redux/store/store';
import { logout } from '../redux/action/auth';

export class Interceptor {
  setupAxiosInterceptor(token: string) {
    axios.interceptors.response.use(this.responseSuccessInterceptor, Interceptor.responseFailureInterceptor);
    axios.defaults.headers.common['app-authorization'] = `Bearer ${token}`;
  }

  private responseSuccessInterceptor(response: AxiosResponse) {
    return response;
  }

  private static responseFailureInterceptor(error: any) {
    if (error.response.status === 401) {
      (store.dispatch as any)(logout());
      navigate('Root', { screen: 'Login' });
    }
    return Promise.reject(error);
  }
}

export const appInterceptor = new Interceptor();
