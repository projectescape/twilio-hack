import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SearchChannel = ({ title = "Join Channels" }) => {
  const [result, setResult] = useState([]);
  const [inputVal, setInputVal] = useState("");

  const repoList = useMemo(() => renderRepos(result), [result]);

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {renderTitle(title)}
      <div
        className="columns"
        style={{ padding: "1rem", marginBottom: "0", paddingBottom: "0" }}
      >
        <div className="column is-10">
          <div className="control ">
            <input
              className="input"
              type="text"
              placeholder="Enter user or repository name"
              value={inputVal}
              onChange={(e) => {
                setInputVal(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="column is-2">
          <button
            className="button is-fullwidth"
            onClick={async () => {
              if (inputVal === "") {
                const { data } = await axios.get(`/api/channels/nonsubscribed`);
                setResult(data);
              } else {
                const { data } = await axios.get(
                  `/api/channels/nonsubscribed/search/${inputVal}`
                );
                setResult(data);
              }
            }}
          >
            Search
          </button>
        </div>
      </div>
      <div
        style={{
          padding: "1rem",
          overflowY: "auto",
          flexGrow: 1,
        }}
      >
        {repoList}
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

const renderRepos = (result) => {
  console.log("Rendering Repos");
  return result.map((repo) => (
    <div className="breadcrumb">
      <ul>
        <li className="is-active">
          <Link>
            <span className="icon is-small">
              <i className="fas fa-user" />
            </span>
            {repo.split("~")[0]}
          </Link>
        </li>
        <li>
          <Link
            onClick={async () => {
              await axios.post("/api/channels/join", { channelName: repo });
            }}
          >
            <span className="icon is-small">
              <i className="fas fa-code-branch" />
            </span>
            {repo.split("~")[1]}
          </Link>
        </li>
      </ul>
    </div>
  ));
};

export default SearchChannel;
