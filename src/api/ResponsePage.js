import axios from "axios";

export const responsePage = async (path, page, searchText, filters) => {
  const { type, status, species, gender, dimension } = filters;

  const queryParams = {
    page: page,
    name: searchText,
    gender: gender,
    type: type,
    status: status,
    species: species,
    dimension: dimension,
  };

  const queryString = Object.entries(queryParams)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");

  const url = `https://rickandmortyapi.com/api/${path}/?${queryString}`;

  const response = await axios.get(url);
  return response;
};
