import axios, { AxiosInstance, AxiosResponse } from "axios";

export class Interceptor {
  setupAxiosInterceptor(token: string, onUnAuth: Function) {
    axios.interceptors.response.use(Interceptor.responseSuccessInterceptor, (error) => Interceptor.responseFailureInterceptor(error, onUnAuth));
    axios.defaults.headers.common['app-authorization'] = `Bearer ${token}`;
  }

  setupAxiosClientInterceptor(axiosClient: AxiosInstance, token: string, onUnAuth: Function) {
    axiosClient.interceptors.response.use(Interceptor.responseSuccessInterceptor, (error) => Interceptor.responseFailureInterceptor(error, onUnAuth));
    axiosClient.defaults.headers.common['app-authorization'] = `Bearer ${token}`;
  }

   static responseSuccessInterceptor(response: AxiosResponse) {
    return response;
  }

   static responseFailureInterceptor(error: any, onUnAuth: Function) {
    if (error.response.status === 401) {
      onUnAuth();
    }
    return Promise.reject(error);
  }
}

export const appInterceptor = new Interceptor();
