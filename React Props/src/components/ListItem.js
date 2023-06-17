import React from "react";

const ListItem = (props) => {
  return (
    <div
      className="ListItem"
      style={{
        backgroundColor: props.bgColor,
        height: 30
      }}
    >
      <img src={props.icon} alt={props.name} />
      <a href={props.link}>{props.name}</a>
    </div>
  );
};

export default ListItem;
