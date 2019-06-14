import React from "react";
const ListGroup = props => {
  const { items, textProperty, onItemSelect, selectedItem } = props;
  console.log("items:", items);
  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          onClick={() => onItemSelect(item)}
          key={item._id}
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = { textProperty: "name", itemProperty: "_id" };
export default ListGroup;
