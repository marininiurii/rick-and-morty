import axios from "axios";

export const responseCharactersPage = async (state, setState, page) => {
  try {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character/?page=${page}`
    );
    setState([...state, ...response.data.results]);
  } catch (error) {
    console.error(error);
  }
};
