import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: "" }); // Set base URL to an empty string

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ["User", "Post"],
  endpoints: (builder) => ({}),
});
