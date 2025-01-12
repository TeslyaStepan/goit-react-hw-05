import { Field, Form, Formik } from "formik";
import { useSearchParams } from "react-router-dom";
import { fetchMovieList } from "../../TMDB-api";
import { lazy, useEffect, useState } from "react";
const MovieList = lazy(() => import("../../components/MovieList/MovieList"));

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const query = searchParams.get("query") || "";

  const onSubmit = (values) => {
    handleChangeQuery(values.query);
  };

  useEffect(() => {
    if (!query) {
      setData([]);
      return;
    }

    const getData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchMovieList(query);
        setData(data);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [query]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong. Please try again later.</p>;

  const handleChangeQuery = (newQuery) => {
    if (!newQuery) {
      searchParams.delete("query");
      return setSearchParams(searchParams);
    }
    searchParams.set("query", newQuery);
    setSearchParams(searchParams);
  };

  const filterByQuery =
    (data &&
      data?.filter((movie) =>
        movie.title.toLowerCase().trim().includes(query.trim().toLowerCase())
      )) ||
    [];
  return (
    <div>
      <Formik initialValues={{ query }} onSubmit={onSubmit}>
        <Form>
          <Field type="text" name="query" />
          <button type="submit">Search</button>
        </Form>
      </Formik>
      <MovieList filterByQuery={filterByQuery} />
    </div>
  );
}
