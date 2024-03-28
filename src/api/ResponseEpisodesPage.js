import axios from "axios";

export const responseEpisodePage = async (state, setState, page) => {
  try {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/episode/?page=${page}`
    );
    setState([...state, ...response.data.results]);
  } catch (error) {
    console.error(error);
  }
};
