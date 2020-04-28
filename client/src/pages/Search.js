import React, { useState, useEffect, useContext } from "react";
import BannerLeft from "../components/BannerLeft";
import SearchLeft from "../components/SearchLeft";
import SearchCenter from "../components/SearchChannel";
import ResizablePanels from "../components/ResizablePanelsReact";
import axios from "axios";
import Context from "../context";
import CreateChannel from "../components/CreateChannel";

const Search = () => {
  const [currentAction, setCurrentAction] = useState(true);

  const { profile } = useContext(Context);

  const [myChannels, setMyChannels] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/api/channels/subscribed/all");
      console.log(data);
      setMyChannels(data);
    })();
  }, []);

  return (
    <>
      <BannerLeft title="Channels" />
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
          <SearchLeft
            title="Your Channels"
            myChannels={myChannels}
            currentAction={currentAction}
            setCurrentAction={() => setCurrentAction(!currentAction)}
          />
          {currentAction ? (
            <SearchCenter />
          ) : (
            <CreateChannel username={profile.username} />
          )}
        </ResizablePanels>
      </div>
    </>
  );
};

export default Search;
