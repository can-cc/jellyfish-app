import axios from 'axios';

/* export function setupAxiosInterceptor() {
 *   axios.interceptors.response.use(responseSuccessInterceptor, responseFailureInterceptor);
 * }
 *  */

export function setupAxiosJwtHeader(jwt: string) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
}
/*
 * export function removeAxiosJwtHeader() {
 *   axios.defaults.headers.common['Authorization'] = '';
 *   delete axios.defaults.headers.common['Authorization'];
 * } */
