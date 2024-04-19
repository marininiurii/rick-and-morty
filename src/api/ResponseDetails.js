import axios from "axios";

export const responseDetails = async (path, id) => {
  try {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/${path}/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
