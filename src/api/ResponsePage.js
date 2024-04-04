import axios from "axios";

export const responsePage = async (path, page, searchText) => {
  try {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/${path}/?page=${page}&name=${searchText}`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};
