import { FaSearch as SearchIcon } from "react-icons/fa";

import classes from "./search.module.css";

interface Props {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export const Search = ({ search, setSearch }: Props) => {
  return (
    <label className={classes.search}>
      <SearchIcon />
      <h2>SEARCH</h2>
      <input
        type="text"
        placeholder="Enter fund name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </label>
  );
};
