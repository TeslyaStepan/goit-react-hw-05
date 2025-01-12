import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { fetchMovieDetails } from "../../TMDB-api";

export default function MovieDetailsPage() {
  const location = useLocation();
  const goBackRef = useRef(location.state);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const movieData = await fetchMovieDetails(movieId);
        setData(movieData);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [movieId]);

  //   if (isLoading) return <p>Loading...</p>;
  //   if (isError) return <p>Something went wrong. Please try again later.</p>;

  return (
    <div>
      <Link to={goBackRef.current}>Go Back</Link>
      <section>
        <img src="" alt="" />
        <h2>{data.original_title}</h2>
        <p></p>
        <h3>Overview</h3>
        <p></p>
        <h4></h4>
        <ul>{}</ul>
      </section>
    </div>
  );
}
