import React, { Component } from "react";
import { DESTRUCTION } from "dns";
class TableHeader extends Component {
  // column array
  //sortColumn : object
  //onSort : function

  raiseSort = path => {
    const clonnedSortColumn = { ...this.props.sortColumn };
    if (clonnedSortColumn.path === path) {
      clonnedSortColumn.order =
        clonnedSortColumn.order === "asc" ? "desc" : "asc";
    } else {
      clonnedSortColumn.path = path;
      clonnedSortColumn.order = "asc";
    }
    this.props.onSort(clonnedSortColumn);
  };

  renderSortIcon = column => {
    console.log("column:", column);
    console.log("this column:", this.props.sortColumn);

    if (column.path !== this.props.sortColumn.path) return null;

    if (this.props.sortColumn.order === "asc")
      return <i className="fa fa-sort-asc" />;

    return <i className="fa fa-sort-desc" />;
  };

  render() {
    console.log("columns:", this.props.columns);
    return (
      <thead className="clickable">
        <tr>
          {this.props.columns.map(column => (
            <th
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.lable} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
