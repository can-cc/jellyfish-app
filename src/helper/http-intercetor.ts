import axios from 'axios';

export function setupAxiosJwtHeader(jwt: string) {
  axios.defaults.headers.common['App-Authorization'] = `Bearer ${jwt}`;
}
