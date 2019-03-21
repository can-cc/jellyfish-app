//      
import axios from 'axios';


export function setupAxiosJwtHeader(jwt        ) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
}