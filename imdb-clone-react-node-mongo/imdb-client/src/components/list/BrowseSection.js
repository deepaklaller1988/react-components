import { useEffect, useState } from "react";
import axios from "axios";
import Table from "../BrowseMovies/Table";
import Sort from "../BrowseMovies/Sort";
import Genre from "../BrowseMovies/Genre";
import Pagination from "../BrowseMovies/Pagination";
import Search from "../BrowseMovies/Search";
import "../../App.css";

function BrowseSection() {
  const [obj, setObj] = useState({});
  const [sort, setSort] = useState({ sort: "rating", order: "desc" });
  const [filterGenre, setFilterGenre] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    console.log(filterGenre.toString(), sort.sort)
    const getAllMovies = async () => {
      try {
        const url = `http://localhost:8080/api/browse-movies?page=${page}&sort=${
          sort.sort
        },${
          sort.order
        }&genre=${filterGenre.toString()}&search=${search}&limit=10`;
        const { data } = await axios.get(url);
        setObj(data);
      } catch (err) {
        console.log(err);
      }
    };

    getAllMovies();
  }, [sort, filterGenre, page, search]);

  return (
    <div className="container">
      <div className="head">
        <img src="./images/logo.png" alt="logo" className="logo" />
        <Search setSearch={(search) => setSearch(search)} />
      </div>
      <div className="body">
        <div className="table_container">
          <Table movies={obj.movies ? obj.movies : []} />
          <Pagination
            page={page}
            limit={obj.limit ? obj.limit : 0}
            total={obj.total ? obj.total : 0}
            setPage={(page) => setPage(page)}
          />
        </div>
        <div className="filter_container">
          <Sort sort={sort} setSort={(sort) => setSort(sort)} />
          <Genre
            filterGenre={filterGenre}
            genres={obj.genres ? obj.genres : []}
            setFilterGenre={(genre) => setFilterGenre(genre)}
          />
        </div>
      </div>
    </div>
  );
}

export default BrowseSection;
