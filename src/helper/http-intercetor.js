// @flow
import axios from 'axios';


export function setupAxiosJwtHeader(jwt: string) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
}