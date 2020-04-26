import React from "react";
import BannerLeft from "../components/BannerLeft";
import ChannelLeft from "../components/ChannelLeft";
import ChannelCenter from "../components/ChannelCenter";
import ResizablePanels from "../components/ResizablePanelsReact";

const SearchChannel = () => {
  return (
    <>
      <BannerLeft title="ChannelName" />
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
          <ChannelLeft />
          <ChannelCenter />
        </ResizablePanels>
      </div>
    </>
  );
};

export default SearchChannel;
