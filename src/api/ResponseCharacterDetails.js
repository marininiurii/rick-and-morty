import axios from "axios";

export const responseCharacterDetails = async (id) => {
  try {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
