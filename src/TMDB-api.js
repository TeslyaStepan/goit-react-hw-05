import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
const API_KEY = "8aba4e3419a44727b7eb66f35fce4fa2";

export async function fetchHomeList() {
  const { data } = await axios.get("/trending/movie/week", {
    params: {
      api_key: API_KEY,
    },
  });
  console.log(data);
  return data.results || [];
}

export async function fetchMovieList(query) {
  const { data } = await axios.get("/search/movie", {
    params: {
      api_key: API_KEY,
      query,
    },
  });
  return data.results;
}

export async function fetchMovieDetails(movieId) {
  const { data } = await axios.get(`/movie/${movieId}`, {
    params: {
      api_key: API_KEY,
    },
  });
  return data.results;
}
