import { NavLink, Outlet } from "react-router-dom";

export default function Navigation() {
  return (
    <div>
      <header>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/movies">Movies</NavLink>
        </nav>
        <Outlet />
      </header>
    </div>
  );
}
