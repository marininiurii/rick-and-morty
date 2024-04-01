import axios from "axios";

export const responseEpisodeDetails = async (id) => {
  try {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/episode/${id}`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};
