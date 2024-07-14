import axios from 'axios';

// const API_KEY = 'f22ac2e2868ef156698b62ae7d66a78e';
const API_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjJhYzJlMjg2OGVmMTU2Njk4YjYyYWU3ZDY2YTc4ZSIsIm5iZiI6MTcyMDcyMTMwMi43OTA4OTUsInN1YiI6IjY2OTAxYmE1NTY2Yjg4ZGFhODgwMmY5ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QbNFAty0T9ZHZLxw6qh-AOfeScMOuRna0MjONAeQgY8';
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_TOKEN}`,
  },
};

export const fetchTrandingMovie = async () => {
  const res = await axios(
    `${axios.defaults.baseURL}trending/movie/day`,
    options
  );
  return res.data;
};

export const fetchMoviesByQuery = async (query, page) => {
  const res = await axios(
    `${axios.defaults.baseURL}search/movie?query=${query}&page=${page}`,
    options
  );
  return res.data;
};

export const fetchMovieDetailsById = async (movieId) => {
  const res = await axios(`${axios.defaults.baseURL}movie/${movieId}`, options);
  return res.data;
};

export const fetchMovieCreditsById = async (movieId) => {
  const res = await axios(
    `${axios.defaults.baseURL}movie/${movieId}/credits`,
    options
  );
  return res.data.cast;
};

export const fetchMovieReviewsById = async (movieId) => {
  const res = await axios(
    `${axios.defaults.baseURL}movie/${movieId}/reviews`,
    options
  );
  return res.data.results;
};
