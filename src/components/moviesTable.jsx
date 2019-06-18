import React, { Component } from "react";
import Like from "../common/like";
import Table from "../common/table";
import auth from "../services/authServices";
import { Link } from "react-router-dom";
class MoviesTable extends Component {
  // Since 'columns' object is not subject to change through out this  component life cycle, so no need to keep as part of State.
  // below columns array, we have function named as 'content' which is taking 'movie' as a argument

  // Use for ` (back tick) used in content function: It is used to insert dynamic value into the string.

  columns = [
    {
      path: "title",
      lable: "Title",
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { path: "genre.name", lable: "Genre" },
    { path: "numberInStock", lable: "Stock" },
    { path: "dailyRentalRate", lable: "Rate" },
    {
      key: "like",
      content: movie => (
        <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      )
    }
  ];

  deleteColumn = {
    key: "delete",
    content: movie => (
      <button
        className="btn btn-danger btn-small"
        onClick={() => this.props.onDelete(movie)}
      >
        Delete
      </button>
    )
  };

  //Below is our custom constructor, so we have to invoke super() as well.
  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }

  render() {
    const { pageMovies, sortColumn, onSort } = this.props;
    return (
      <Table
        columns={this.columns}
        data={pageMovies}
        onSort={onSort}
        sortColumn={sortColumn}
      />
    );
  }
}

export default MoviesTable;
