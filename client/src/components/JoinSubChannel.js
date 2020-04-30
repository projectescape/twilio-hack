import axios from "axios";
import getClassNameForExtension from "font-awesome-filetypes";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

const JoinSubChannel = ({ toggleMode }) => {
  const [result, setResult] = useState([]);
  const [searched, setSearched] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const { owner, repoName } = useParams();

  const history = useHistory();

  useEffect(() => {
    axios
      .get(`/api/subchannels/nonsubscribed/${owner}/${repoName}`)
      .then(({ data }) => {
        setSearched(true);
        setResult(data);
      });
  }, []);

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {renderTitle("Join SubChannel", toggleMode)}
      {showProgress ? (
        <progress className="progress is-medium is-dark" max="100">
          45%
        </progress>
      ) : null}
      <div
        style={{
          padding: "1rem",
          overflowY: "auto",
          flexGrow: 1,
        }}
      >
        {renderRepos(result, searched, history, setShowProgress)}
      </div>
    </div>
  );
};

const renderTitle = (title, toggleMode) => {
  return (
    <div className="has-background-light" style={{ display: "flex" }}>
      <div style={{ flexGrow: 1 }}>
        <h1 className="subtitle is-3" style={{ padding: "0.7rem" }}>
          {title}
        </h1>
      </div>
      <div
        className="has-background-danger"
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          cursor: "pointer",
        }}
        onClick={toggleMode}
      >
        <span className="icon">
          <i className="fas fa-2x fa-times"></i>
        </span>
      </div>
    </div>
  );
};

const renderChannelItem = (channel, history, setShowProgress) => {
  const res = [];
  for (let i = 0; i < channel.split("~")[2].split("/").length; i++) {
    res.push(
      <li
        key={channel.split("~")[2].split("/")[i]}
        className={
          i === channel.split("~")[2].split("/").length - 1 ? "" : "is-active"
        }
      >
        <Link
          onClick={async () => {
            setShowProgress(true);
            await axios.post("/api/channels/join", { channelName: channel });
            history.push(
              `/channel/${channel.split("~")[0]}/${
                channel.split("~")[1]
              }/${channel.split("~")[2].replace(/\//g, "~")}`
            );
          }}
        >
          <span className="icon is-small">
            <i
              className={`fas ${
                channel.split("~")[2].split("/").length - 1
                  ? getClassNameForExtension(
                      channel.split("~")[2].split("/")[i].split(".").pop()
                    )
                  : "fa-folder"
              }`}
            />
          </span>
          {channel.split("~")[2].split("/")[i]}
        </Link>
      </li>
    );
  }
  return res;
};

const renderRepos = (result, searched, history, setShowProgress) => {
  if (searched === false)
    return (
      <progress className="progress is-medium is-dark" max="100">
        45%
      </progress>
    );
  return result.map((channel) => (
    <div className="breadcrumb" key={channel}>
      <ul>{renderChannelItem(channel, history, setShowProgress)}</ul>
    </div>
  ));
};

export default JoinSubChannel;
