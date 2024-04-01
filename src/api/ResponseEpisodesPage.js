import axios from "axios";

export const responseEpisodePage = async (page) => {
  try {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/episode/?page=${page}`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};
