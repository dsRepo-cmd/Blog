import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TOKEN_LOCAL_STORAGE_KEY } from "../const/localStorage";

export const rtkApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: __API__,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY) || "";
      if (token) {
        headers.set("Authorization", token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({}),
});
