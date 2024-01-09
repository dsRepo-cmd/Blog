import axios from "axios";
import { TOKEN_LOCAL_STORAGE_KEY } from "@/shared/const/localStorage";

export const $api = axios.create({
  baseURL: __API__,
});

$api.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization =
      localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY) || "";
  }
  return config;
});
