import { Link, useLocation } from "react-router-dom";

export default function MovieList({ filterByQuery }) {
  const location = useLocation();
  return (
    <div>
      <ul>
        {filterByQuery.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id.toString()}`} state={location}>
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
