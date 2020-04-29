import React from "react";
import { Link, useParams } from "react-router-dom";
import getClassNameForExtension from "font-awesome-filetypes";

const ChannelLeft = ({
  title = "SubChannels",
  myChannels,
  setCreateToggle,
}) => {
  const { owner, repoName } = useParams();

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
          Create New SubChannel
        </button>
      </div>
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
