import axios, { AxiosResponse } from 'axios';

export class Interceptor {
  setupAxiosInterceptor(token: string, onUnAuth: Function) { // to prevent circle require
    axios.interceptors.response.use(this.responseSuccessInterceptor, (error) => Interceptor.responseFailureInterceptor(error, onUnAuth));
    axios.defaults.headers.common['app-authorization'] = `Bearer ${token}`;
  }

  private responseSuccessInterceptor(response: AxiosResponse) {
    return response;
  }

  private static responseFailureInterceptor(error: any, onUnAuth: Function) {
    if (error.response.status === 401) {
      onUnAuth();
    }
    return Promise.reject(error);
  }
}

export const appInterceptor = new Interceptor();
