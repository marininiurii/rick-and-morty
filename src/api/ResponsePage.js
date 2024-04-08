import axios from "axios";

export const responsePage = async (path, page, searchText, filters) => {
  const {
    type,
    status,
    species,
    gender,
    dimension
  } = filters;

  const url = `https://rickandmortyapi.com/api/${path}/?page=${encodeURIComponent(page)}&name=${encodeURIComponent(searchText)}&gender=${encodeURIComponent(gender)}&type=${encodeURIComponent(type)}&status=${encodeURIComponent(status)}&species=${encodeURIComponent(species)}&dimension=${encodeURIComponent(dimension)}`;

  const response = await axios.get(url);
  return response;
};