import { Field, Form, Formik } from "formik";
import { Link, useSearchParams } from "react-router-dom";
import { useHttp } from "../../hooks/useHttp/useHttp";
import { fetchMovieList } from "../../TMDB-api";
import { useEffect, useState } from "react";

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies] = useHttp(fetchMovieList);
  const [query, setQuery] = useState(searchParams.get("query") ?? "");

  useEffect(() => {
    setQuery(searchParams.get("query") ?? "");
  }, [searchParams]);

  const onSubmit = (values) => {
    handleChangeQuery(values.query);
  };

  const handleChangeQuery = (newQuery) => {
    if (!newQuery) {
      searchParams.delete("query");
      return setSearchParams(searchParams);
    }
    searchParams.set("query", newQuery);
    setSearchParams(searchParams);
  };

  const filterByQuery = movies?.filter((movie) =>
    movie.title.toLowerCase().trim().includes(query.trim().toLowerCase())
  );
  return (
    <div>
      <Formik>
        <Form onSubmit={onSubmit} initialValues={{ query }}>
          <Field type="text" name="query" />
          <button type="submit">Search</button>
        </Form>
      </Formik>
      <ul>
        {filterByQuery.map((movie) => (
          <li key={movie.id}>
            <Link to={movie.id.toString()}>{movie.title || movie.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
