import axios from "axios";

export const responseLocationsPage = async (state, setState, page) => {
  try {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/location/?page=${page}`
    );
    setState([...state, ...response.data.results]);
    console.log(response.data.results);
  } catch (error) {
    console.error(error);
  }
};
