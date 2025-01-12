import { useEffect, useState } from "react";
import { fetchMovieReviews } from "../../TMDB-api";
import { useParams } from "react-router-dom";
import s from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { moviesId } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const castData = await fetchMovieReviews(moviesId);
        setData(castData || []);
      } catch (error) {
        setIsError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [moviesId]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong. Please try again later.</p>;

  return (
    <div className={s.reviewContainer}>
      {data.length > 0 ? (
        <ul className={s.reviewList}>
          {data.map((review) => (
            <li key={review.id}>
              <p>{review.author}</p>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>There is no reviews for now</p>
      )}
    </div>
  );
}
