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

const SET_PAGE = "SET_PAGE";
const SEARCH_TEXT = "SEARCH_TEXT";
const RENDER_CHARACTERS = "RENDER_CHARACTERS";
const PREVIEW_VALUE_CHARACTERS_STEP = 8;
const SET_FILTERS = "SET_FILTERS";
const EPISODES = "EPISODES";
const RENDER_CARDS = "RENDER_CARDS";
const PREVIEW_VALUE_CARDS_STEP = 12;

export const charactersPageReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_PAGE:
      return {
        ...state,
        page: state.page + 1,
      };
    case SEARCH_TEXT:
      return {
        ...state,
        searchText: action.payload,
      };
    case RENDER_CHARACTERS:
      return {
        ...state,
        renderCharacters: state.renderCharacters + PREVIEW_VALUE_CHARACTERS_STEP,
      };
    case SET_FILTERS:
      return {
        ...state,
        filters: action.payload,
      };
    case EPISODES:
      return {
        ...state,
        episodes: action.payload,
      };
    case RENDER_CARDS:
      return {
        ...state,
        renderCards: state.renderCards + PREVIEW_VALUE_CARDS_STEP,
      };
    default:
      return state;
  }
};

export const renderCardsAction = () => ({ type: RENDER_CARDS });
export const setEpisodesAction = (payload) => ({ type: EPISODES, payload });
export const setFiltersAction = (payload) => ({ type: SET_FILTERS, payload });
export const renderCharactersAction = () => ({ type: RENDER_CHARACTERS });
export const setSearchTextAction = (payload) => ({
  type: SEARCH_TEXT,
  payload,
});
export const setPageAction = () => ({ type: SET_PAGE });
