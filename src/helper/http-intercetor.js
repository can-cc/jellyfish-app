import axios from 'axios';

/* export function setupAxiosInterceptor() {
 *   axios.interceptors.response.use(responseSuccessInterceptor, responseFailureInterceptor);
 * }
 *  */

export function setupAxiosJwtHeader(jwt: string) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
}
