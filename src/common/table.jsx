import React, { Component } from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

// We can destructure below line -
// "const Table = props => {"  to  "const Table = ({ columns, sortColumn, onSort, data }) => {"
//this is called argument destructure

const Table = props => {
  const { columns, sortColumn, onSort, data } = props;
  return (
    <table className="table">
      <TableHeader
        columns={columns}
        sortColumn={sortColumn} // sortColumn is coming from Parent class i.e ListMovieExcercise
        onSort={onSort} // onSort is coming from Parent class i.e ListMovieExcercise
      />
      <TableBody data={data} columns={columns} />
    </table>
  );
};

export default Table;
