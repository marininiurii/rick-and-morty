import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
  page: 0,
  searchText: "",
  numberRenderedCharacters: 8,
  numberRenderedCards: 12,
  filters: {
    type: "",
    status: "",
    species: "",
    gender: "",
    dimension: "",
  },
  episodes: [],
  locations: [],
};

export const StateSlice = createSlice({
  name: "StateSlice",
  initialState: defaultState,
  reducers: {
    setPage: (state) => {
      state.page += 1;
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setNumberRenderedCharacters: (state) => {
      state.numberRenderedCharacters += 8;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    setEpisodes: (state, action) => {
      state.episodes = action.payload;
    },
    setLocations: (state, action) => {
      state.locations = action.payload;
    },
    setNumberRenderedCards: (state) => {
      state.numberRenderedCards += 12;
    },
  },
});
export const reducer = StateSlice.reducer;

export const {
  setPage,
  setSearchText,
  setNumberRenderedCharacters,
  setFilters,
  setEpisodes,
  setLocations,
  setNumberRenderedCards,
} = StateSlice.actions;
