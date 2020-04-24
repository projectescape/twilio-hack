import React from "react";

const ColumnLeft = ({ children }) => {
  return (
    <div
      className="column is-2 has-background-primary"
      style={{ borderRight: "2px solid #aaa", borderLeft: "2px solid #aaa" }}
    >
      {children}
    </div>
  );
};

export default ColumnLeft;
