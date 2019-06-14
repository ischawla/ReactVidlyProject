import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
class Page extends Component {
  render() {
    const { itemsCount, pageSize, currentPage, onPageChange } = this.props;
    console.log("current page:", currentPage);
    const pageCount = Math.ceil(itemsCount / pageSize);
    if (pageCount === 1) return null;
    const pages = _.range(1, pageCount + 1); // this _.range() gives an array [1...pageCount] which we can iterate thru map()
    return (
      <div>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            {pages.map(page => (
              <li key={page} className="page-item">
                <a
                  className={
                    page === currentPage ? "page-link active" : "page-link"
                  }
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    );
  }
}

Page.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};
export default Page;
