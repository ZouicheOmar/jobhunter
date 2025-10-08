import { Candid } from "@/types/CandidType";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const candidsApi = createApi({
  reducerPath: "candids",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/" }),
  endpoints: (build) => ({
    getCandid: build.query<Candid[], void>({
      query: () => ({ url: `candid/` }),
      // transformResponse: (res) => res.json(),
    }),
    getCity: build.query<Candid[], void>({
      query: () => ({ url: `city/` }),
      transformResponse: (res) => res.json(),
    }),
    getTech: build.query<Candid[], void>({
      query: () => `tech/`,
    }),
  }),
})


export const {
  useGetCandidQuery,
  useGetCityQuery,
  useGetTechQuery
} = candidsApi;
