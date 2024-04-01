import axios from "axios";

export const responseLocationsDetails = async (id) => {
  try {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/location/${id}`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};
