import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import getClassNameForExtension from "font-awesome-filetypes";
import axios from "axios";

const ChannelLeft = ({
  title = "SubChannels",
  myChannels,
  setCreateToggle,
  profile,
  refetchSubscribed,
}) => {
  const { owner, repoName, subChannelName } = useParams();
  const history = useHistory();
  const [progress, setProgress] = useState(false);
  useEffect(() => {
    setProgress(false);
  }, [owner, repoName, subChannelName]);

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {renderTitle(title)}
      <div style={{ padding: "0.75rem" }}>
        <button className="button is-fullwidth" onClick={setCreateToggle}>
          {profile.username === owner ? "Create " : "Join "}new SubChannel
        </button>
      </div>
      <div style={{ padding: "0.75rem", paddingTop: 0 }}>
        <button
          className="button is-fullwidth is-danger"
          onClick={async () => {
            setProgress(true);
            if (profile.username === owner) {
              if (subChannelName === "general") {
                console.log("Delete Channel");
                await axios.post("/api/channels/delete", {
                  owner,
                  repoName,
                });
                history.push(`/`);
              } else {
                console.log("Delete Subchannel");
                // history.push(`/channel/${owner}/${repoName}/general`);
                refetchSubscribed();
                setProgress(false);
              }
            } else {
              if (subChannelName === "general") {
                console.log("Leave Channel");
              } else {
                console.log("Leave Subchannel");
              }
            }
          }}
        >
          {profile.username === owner ? "Delete " : "Leave "}
          {subChannelName === "general" ? "Channel" : "SubChannel"}
        </button>
      </div>
      {progress ? (
        <progress class="progress is-medium is-dark" max="100">
          45%
        </progress>
      ) : null}
      <div style={{ overflowY: "auto", flexGrow: 1 }}>
        <div style={{ padding: "0.75rem" }}>
          <div>
            {renderSubChannelList(getChannelTree(myChannels), owner, repoName)}
          </div>
        </div>
      </div>
    </div>
  );
};

const getChannelTree = (myChannels) => {
  return myChannels
    .map((c) => c.split("~")[2])
    .reduce((r, p) => {
      var names = p.split("/");
      names.reduce((q, name) => {
        var temp = q.find((o) => o.name === name);
        if (!temp) q.push((temp = { name, children: [] }));
        return temp.children;
      }, r);
      return r;
    }, []);
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

const renderSubItem = (parentPath, item, owner, repoName) => {
  if (item.children.length === 0)
    return (
      <div
        style={{
          paddingLeft: "1rem",
          paddingRight: "1rem",
          padding: "0.3rem 1rem",
          fontSize: "1.33rem",
        }}
        onClick={() => {
          console.log(parentPath + item.name);
        }}
      >
        <Link
          to={`/channel/${owner}/${repoName}/${(parentPath + item.name).replace(
            /\//g,
            "~"
          )}`}
          style={{ display: "block" }}
        >
          <i
            className={`fas ${getClassNameForExtension(
              item.name.split(".").pop()
            )}`}
          ></i>

          <span style={{ paddingLeft: "0.5rem" }}>{item.name}</span>
        </Link>
      </div>
    );
  return (
    <div
      style={{
        paddingLeft: "1rem",
        paddingRight: "1rem",
        paddingTop: "0.6rem",
        fontSize: "1.33rem",
      }}
    >
      <i className="fas fa-folder"></i>

      <span style={{ paddingLeft: "0.5rem" }}>{item.name}</span>
      <div style={{ paddingLeft: "0.5rem" }}>
        {item.children.map((c) =>
          renderSubItem(parentPath + item.name + "/", c, owner, repoName)
        )}
      </div>
    </div>
  );
};

const renderSubChannelList = (myChannels, owner, repoName) => {
  console.log(myChannels);

  return myChannels.map((c) => renderSubItem("", c, owner, repoName));
};

export default ChannelLeft;
