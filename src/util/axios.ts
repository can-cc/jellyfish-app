import axios from "axios";
import { API_BASE } from "../env/env";

export const axiosClient = axios.create({ //all axios can be used, shown in axios documentation
  baseURL: API_BASE,
  responseType: "json"
});