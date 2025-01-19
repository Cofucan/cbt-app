import axios from "axios"
import {baseUrl} from "../../lib/utils.ts";

const httpService = axios.create({
  baseURL: baseUrl,
  // withCredentials: true,
})

export const unsecureHttpService = axios.create({
    baseURL: `${baseUrl}`,
})

unsecureHttpService.interceptors.response.use((data) => {
    return data;
}, async (error) => {
    return Promise.reject(error);
});

httpService.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers["Authorization"] = "Bearer " +token
    }
    return config
  },
  function (error) { 
    return Promise.reject(error)
  },
)

export default httpService