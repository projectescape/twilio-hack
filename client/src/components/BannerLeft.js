import React from "react";

const BannerLeft = ({ title }) => {
  return (
    <div
      style={{
        display: "inline-block",
        width: "30px",
        height: "100%",
        paddingTop: "60vh",
      }}
    >
      <div
        className="is-size-4 has-text-white-bis "
        style={{
          transform: "rotate(-90deg)",
          whiteSpace: "nowrap",
        }}
      >
        {title}
      </div>
    </div>
  );
};

export default BannerLeft;
