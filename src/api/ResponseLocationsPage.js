import axios from "axios";

export const responseLocationsPage = async (page) => {
  try {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/location/?page=${page}`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};
