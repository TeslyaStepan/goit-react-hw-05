// import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchHomeList } from "../../TMDB-api";
import s from "./HomePage.module.css";
import MovieList from "../../components/MovieList/MovieList";

export default function HomePage() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  // const location = useLocation();

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
    <div className={s.homePage}>
      <h2 className={s.title}>Trending today</h2>
      {/* <ul className={s.movieList}>
        {data.map((movie) => (
          <li key={movie.id}>
            <div className={s.movieContainer}>
              <Link
                className={s.movieName}
                to={`/movies/${movie.id.toString()}`}
                state={location}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={300}
                />
                <p className={s.movieName}>{movie.title}</p>
              </Link>
            </div>
          </li>
        ))}
      </ul> */}
      <MovieList movies={data} />
    </div>
  );
}
