import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getQueryString = (queryParams) => {
  return Object.entries(queryParams)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join("&");
};

export const rickAndMortyApi = createApi({
  reducerPath: "rickAndMortyApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://rickandmortyapi.com/api/" }),
  endpoints: (builder) => ({
    getCharacters: builder.query({
      query: ({ page = "", id, searchText = "", filters = {} }) => {
        if (id) {
          return `character/${id}`;
        }
        const { status, species, gender } = filters || {};
        const queryParams = {
          page: page,
          name: searchText,
          gender: gender,
          status: status,
          species: species,
        };
        return `character?${getQueryString(queryParams)}`;
      },
    }),
    getLocations: builder.query({
      query: ({ page = "", id, searchText = "", filters = {} }) => {
        if (id) {
          return `location/${id}`;
        }
        const { type, dimension } = filters || {};
        const queryParams = {
          page: page,
          name: searchText,
          type: type,
          dimension: dimension,
        };
        return `location?${getQueryString(queryParams)}`;
      },
    }),
    getEpisodes: builder.query({
      query: ({ page = "", id, searchText = "" }) => {
        if (id) {
          return `episode/${id}`;
        }
        return `episode?page=${page}&name=${searchText}`;
      },
    }),
    getCharactersCollection: builder.query({
      query: (charactersId = []) => {
        return `character/${charactersId.join(",")}`;
      },
    }),
    getEpisodesCollection: builder.query({
      query: (episodesPages = []) => {
        return `episode/${episodesPages.join(",")}`;
      },
    }),
  }),
});

export const {
  useGetCharactersQuery,
  useGetLocationsQuery,
  useGetEpisodesQuery,
  useGetCharactersCollectionQuery,
  useGetEpisodesCollectionQuery,
} = rickAndMortyApi;
