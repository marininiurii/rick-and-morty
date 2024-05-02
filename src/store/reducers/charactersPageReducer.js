import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
  page: 0,
  searchText: "",
  renderCharacters: 8,
  renderCards: 12,
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
    setRenderCharacters: (state) => {
      state.renderCharacters += 8;
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
    setRenderCards: (state) => {
      state.renderCards += 12;
    },
  },
});
export const reducer = StateSlice.reducer;

export const {
  setPage,
  setSearchText,
  setRenderCharacters,
  setFilters,
  setEpisodes,
  setLocations,
  setRenderCards,
} = StateSlice.actions;
