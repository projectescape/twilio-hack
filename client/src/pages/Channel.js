import React, { useState, useEffect } from "react";
import BannerLeft from "../components/BannerLeft";
import ChannelLeft from "../components/ChannelLeft";
import ChannelChat from "../components/ChannelChat";
import ResizablePanels from "../components/ResizablePanelsReact";
import ChannelSnippet from "../components/ChannelSnippet";
import ChannelChecklist from "../components/ChannelCheckList";
import CreateSubChannel from "../components/CreateSubChannel";
import { useParams } from "react-router-dom";
import axios from "axios";

const SearchChannel = () => {
  const { owner, repoName } = useParams();
  const [subscribed, setSubscribed] = useState([]);
  const [createToggle, setCreateToggle] = useState(false);
  const [subChannel, setSubChannel] = useState("general");
  const [viewMode, setViewMode] = useState("chat");

  useEffect(() => {
    axios
      .get(`/api/subchannels/subscribed/${owner}/${repoName}`)
      .then(({ data }) => {
        setSubscribed(data);
      })
      .catch((e) => {
        console.log("error", e.message);
      });
  }, [owner, repoName]);

  return (
    <>
      <BannerLeft title={`${owner}/${repoName}`} />
      <div
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
          <ChannelLeft
            owner={owner}
            repoName={repoName}
            subChannel={subChannel}
            myChannels={subscribed}
            setCreateToggle={() => setCreateToggle(!createToggle)}
          />
          {createToggle ? (
            <CreateSubChannel
              toggleMode={() => setCreateToggle(!createToggle)}
            />
          ) : viewMode === "snippet" ? (
            <ChannelSnippet toggleMode={() => setViewMode("chat")} />
          ) : viewMode === "checklist" ? (
            <ChannelChecklist toggleMode={() => setViewMode("chat")} />
          ) : (
            <ChannelChat toggleMode={(mode) => setViewMode(mode)} />
          )}
          {/* <ChannelChat /> */}
          {/* <ChannelSnippet /> */}
        </ResizablePanels>
      </div>
    </>
  );
};

export default SearchChannel;
