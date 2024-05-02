import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
  episodes: [],
  locations: [],
};

export const episodesLocationsDisplaySlice = createSlice({
  name: "episodesLocationsDisplay",
  initialState: defaultState,
  reducers: {
    setEpisodes: (state, action) => {
      state.episodes = action.payload;
    },
    setLocations: (state, action) => {
      state.locations = action.payload;
    },
  },
});

export const episodesAndLocationsReducer = episodesLocationsDisplaySlice.reducer;

export const { setEpisodes, setLocations } = episodesLocationsDisplaySlice.actions;
