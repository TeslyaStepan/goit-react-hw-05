import { Link } from "react-router-dom";
import { fetchMovieList } from "../../TMDB-api";
import { useHttp } from "../../hooks/useHttp/useHttp";

export default function HomePage() {
  const [movies] = useHttp(fetchMovieList);
  return (
    <div>
      <h2>Trending today</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link to={movie.id.toString()}>{movie.title || movie.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
