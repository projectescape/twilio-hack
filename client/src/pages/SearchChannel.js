import React from "react";
import BannerLeft from "../components/BannerLeft";
import SearchLeft from "../components/SearchLeft";
import SearchCenter from "../components/SearchCenter";
import ResizablePanels from "../components/ResizablePanelsReact";

const SearchChannel = () => {
  return (
    <>
      <BannerLeft title="SearchChannel" />
      <div
        id="lul"
        style={{
          display: "inline-block",
          height: "100%",
          width: "calc(100vw - 30px)",
          verticalAlign: "top",
        }}
      >
        <ResizablePanels
          bkcolor="#e9e9e9"
          displayDirection="row"
          width="100%"
          height="100%"
          panelsSize={[30, 70]}
          sizeUnitMeasure="%"
          resizerColor="#353b48"
          resizerSize="10px"
        >
          <SearchLeft title="Your Channels" />
          <SearchCenter />
        </ResizablePanels>
      </div>
    </>
  );
};

export default SearchChannel;
