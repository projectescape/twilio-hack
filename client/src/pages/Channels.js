import React from "react";
import BannerLeft from "../components/BannerLeft";
import ColumnLeft from "../components/ColumnLeft";
import ColumnRight from "../components/ColumnRight";
import ColumnCenter from "../components/ColumnCenter";

const Channels = () => {
  return (
    <div
      className="columns"
      style={{
        marginTop: "0",
        flex: 1,

        display: "flex",
        borderTop: "2px solid #aaa",
      }}
    >
      <BannerLeft title="Channels" />
      <ColumnLeft>Channels</ColumnLeft>
      <ColumnCenter>Search</ColumnCenter>
      <ColumnRight>Channels</ColumnRight>
    </div>
  );
};

export default Channels;
