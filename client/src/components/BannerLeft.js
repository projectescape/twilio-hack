import React from "react";

const BannerLeft = ({ title }) => {
  return (
    <div className="column is-1" style={{ width: "3rem", margin: "auto" }}>
      <div className="is-size-4 " style={{ transform: "rotate(-90deg)" }}>
        {title}
      </div>
    </div>
  );
};

export default BannerLeft;
