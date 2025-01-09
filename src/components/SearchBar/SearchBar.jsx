import { useState } from "react";
import s from "./SearchBar.module.css";
import { CiSearch } from "react-icons/ci";

export default function SearchBar({ onSearchChange }) {
  const [value, setValue] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    onSearchChange(value);
    setValue("");
  };
  return (
    <header className={s.header}>
      <form onSubmit={handleSearch} className={s.form}>
        <button type="submit" className={s.searchBtn}>
          <CiSearch />
        </button>
        <input
          onChange={(e) => setValue(e.target.value)}
          value={value}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          className={s.searchBar}
        ></input>
      </form>
    </header>
  );
}
