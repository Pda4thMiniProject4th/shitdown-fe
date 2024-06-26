import React from "react";
import "./Seat2.css";

const Seat2 = ({ size, occupied, isSelected }) => {
  const seatClassName = `seat ${occupied ? "occupied" : ""} ${
    isSelected ? "selected" : ""
  }`;

  return (
    <div
      className={seatClassName}
      xs={size}
      style={{ border: "1px solid black" }}
    >
      {isSelected}
    </div>
  );
};

export default Seat2;
