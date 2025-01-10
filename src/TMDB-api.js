import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
const API_KEY = "8aba4e3419a44727b7eb66f35fce4fa2";

export async function fetchMovieList() {
  const { data } = await axios.get("/trending/movie/week", {
    params: {
      api_key: API_KEY,
      //   total_results: 20,
    },
  });
  return data.results;
}
