import React from "react";
import { Link } from "react-router-dom";

const SearchLeft = ({ myChannels, currentAction, setCurrentAction }) => {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {renderTitle("Your Channels")}
      <div style={{ padding: "0.75rem" }}>
        <button className="button is-fullwidth" onClick={setCurrentAction}>
          {currentAction ? "Create New Channel" : "Join New Channel"}
        </button>
      </div>
      <div style={{ overflowY: "auto", flexGrow: 1 }}>
        <div style={{ padding: "0.75rem" }}>
          <div>{renderChannelList(myChannels)}</div>
        </div>
      </div>
    </div>
  );
};

const renderTitle = (title) => {
  return (
    <div className="has-background-light">
      <h1 className="subtitle is-3" style={{ padding: "0.7rem" }}>
        {title}
      </h1>
    </div>
  );
};

const renderChannelList = (myChannels) => {
  return myChannels.map((channel) => (
    <div className="breadcrumb">
      <ul>
        <li className="is-active">
          <Link>
            <span className="icon is-small">
              <i className="fas fa-user" />
            </span>
            {channel.split("~")[0]}
          </Link>
        </li>
        <li>
          <Link
            to={`/channel/${channel.split("~")[0]}/${
              channel.split("~")[1]
            }/general`}
          >
            <span className="icon is-small">
              <i className="fas fa-code-branch" />
            </span>
            {channel.split("~")[1]}
          </Link>
        </li>
      </ul>
    </div>
  ));
};

export default SearchLeft;
