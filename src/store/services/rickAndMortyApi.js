import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rickAndMortyApi = createApi({
  reducerPath: "rickAndMortyApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://rickandmortyapi.com/api/" }),
  endpoints: (builder) => ({
    getCharacters: builder.query({
      query: ({ page = "", id, searchText = "", filters = {} }) => {
        if (id) {
          return `character/${id}`;
        }
        const { type, status, species, gender, dimension } = filters || {};
        const queryParams = {
          page: page,
          name: searchText,
          gender: gender,
          type: type,
          status: status,
          species: species,
          dimension: dimension,
        };
        const queryString = Object.entries(queryParams)
          .filter(([key, value]) => value !== undefined)
          .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
          .join("&");
        return `character?${queryString}`;
      },
    }),
    getEpisodes: builder.query({
      query: ({ page }) => {
        return `episode/?page=${page}`;
      },
    }),
  }),
});

export const { useGetCharactersQuery, useGetEpisodesQuery } = rickAndMortyApi;
