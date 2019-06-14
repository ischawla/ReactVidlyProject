import React, { Component } from "react";
//import { getMovies } from "../services/fakeMovieService";
import { getMovies, deleteMovie } from "../services/movieService";

import { getGenres } from "../services/genreService";
import { toast } from "react-toastify";

import Page from "../common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "../common/listGroup";
import MovieTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "../common/search";

class MovieList extends Component {
  state = {
    movilist: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" }
  };

  async componentDidMount() {
    const { data } = await getGenres(); // await because this method will return a promise.
    const { data: movies } = await getMovies();

    const genre = [{ _id: "", name: "All Genre" }, ...data];
    this.setState({ movilist: movies, genres: genre });
  }

  handleDelete = async movie => {
    const originalMovies = this.state.movilist;

    const newMovieList = originalMovies.filter(m => m._id !== movie._id);
    this.setState({ movilist: newMovieList });
    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie is already deleted");
      this.setState({ movilist: originalMovies });
    }
  };

  handleLike = movie => {
    console.log("handle like invoked", movie);
    const newmovies = [...this.state.movilist]; // [] is used for cloning an array.
    const index = newmovies.indexOf(movie);
    newmovies[index] = { ...newmovies[index] }; // cloning an object using {}. Since newmovies is an array of OBJECT
    newmovies[index].liked = !newmovies[index].liked;
    this.setState({ movilist: newmovies });
  };

  handlePageChange = page => {
    //console.log("handlePageChange invoked", page);
    this.setState({ currentPage: page });
  };
  // here searchQuery is set to '' and not null or undefined bcoz searchbox is a controlled component and if we set to null, React
  // think that u r trying to convert an uncontrol component into control component

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSort = sortColumnSelected => {
    this.setState({ sortColumn: sortColumnSelected });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  getPagedData = () => {
    const {
      currentPage,
      pageSize,
      movilist: allMovies,
      selectedGenre,
      searchQuery,
      sortColumn
    } = this.state;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]); // orderBy(<input>,[array of sort colum as we can sort on multiple colum],[array of order])
    const pageMovies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: pageMovies };
  };

  render() {
    const { length: count } = this.state.movilist; //length is a property of movilist array , so using object de-structuring & renaming it to count
    if (count === 0) return <p>There is no movie in DB</p>;
    const { currentPage, pageSize, sortColumn } = this.state;

    const { totalCount, data: pageMovies } = this.getPagedData();
    const { user } = this.props;

    console.log("val of user:" + user);
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>

        <div className="col">
          {user && (
            <Link
              to="/movies/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Movie
            </Link>
          )}

          <p>Showing {totalCount} movies list...</p>

          <SearchBox value={this.searchQuery} onChange={this.handleSearch} />

          <MovieTable
            pageMovies={pageMovies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Page
            itemsCount={totalCount}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default MovieList;
