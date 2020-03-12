import axios from 'axios';

export function setupAxiosJwtHeader(token: string) {
  axios.defaults.headers.common['app-authorization'] = `Bearer ${token}`;
}
