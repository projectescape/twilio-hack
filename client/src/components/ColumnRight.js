import React from "react";

const ColumnRight = ({ children }) => {
  return (
    <div
      className="column is-4 has-background-primary"
      style={{ borderLeft: "2px solid #aaa" }}
    >
      {children}
    </div>
  );
};

export default ColumnRight;
