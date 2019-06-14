import React from "react";

const SearchBox = ({ value, onChange }) => {
  return (
    <input
      name="query"
      type="text"
      value={value}
      className="form-control my-3"
      placeholder="Search..."
      onChange={e => onChange(e.currentTarget.value)}
    />
  );
};

export default SearchBox;
