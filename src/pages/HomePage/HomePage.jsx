import { Link, useLocation } from "react-router-dom";
import { lazy, useEffect, useState } from "react";
import { fetchHomeList } from "../../TMDB-api";

export default function HomePage() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchHomeList();
        setData(data);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong. Please try again later.</p>;

  return (
    <div>
      <h2>Trending today</h2>
      <ul>
        {data.map((movie) => (
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
