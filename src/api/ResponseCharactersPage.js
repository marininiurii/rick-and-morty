import axios from "axios";

export const responseCharactersPage = async (page) => {
  try {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character/?page=${page}`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};
