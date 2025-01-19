import axios from "axios";
import { baseUrl } from "../../lib/utils.ts";

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
