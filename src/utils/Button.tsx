import React from "react";

type Te = {
  text: string;
  handleFilter: (value: string) => void;
  callValue: string;
};
const Button = (props: Te) => {
  return (
    <button
      className="btn btn-primary mx-2"
      onClick={(e) => props.handleFilter(props.callValue)}
    >
      {props.text}
    </button>
  );
};

export default Button;
