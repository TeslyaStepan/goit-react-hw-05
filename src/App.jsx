import "modern-normalize";
import { Routes, Route, NavLink } from "react-router-dom";
// import toast from "react-hot-toast";
import { lazy } from "react";
// import { useHttp } from "./hooks/useHttp/useHttp";
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage"));

const App = () => {
  // const [isLoading] = useHttp;
  return (
    <>
      <header>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/movie">Movies</NavLink>
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie" element={<MoviesPage />} />
      </Routes>
    </>
  );
};

export default App;
