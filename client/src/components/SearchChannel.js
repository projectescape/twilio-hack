import axios from "axios";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const SearchChannel = () => {
  const [result, setResult] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [showProgress, setShowProgress] = useState(false);
  const history = useHistory();

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {renderTitle("Join Channels")}
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
              onKeyPress={async (e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (inputVal === "") {
                    const { data } = await axios.get(
                      `/api/channels/nonsubscribed`
                    );
                    setResult(data);
                  } else {
                    const { data } = await axios.get(
                      `/api/channels/nonsubscribed/search/${inputVal}`
                    );
                    setResult(data);
                  }
                }
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
        {renderRepos(result, history, setShowProgress)}
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

const renderRepos = (result, history, setShowProgress) => {
  return result.map((repo) => (
    <div className="breadcrumb" key={repo}>
      <ul>
        <li className="is-active" key={repo.split("~")[0]}>
          <Link>
            <span className="icon is-small">
              <i className="fas fa-user" />
            </span>
            {repo.split("~")[0]}
          </Link>
        </li>
        <li key={repo.split("~")[1]}>
          <Link
            onClick={async () => {
              setShowProgress(true);
              await axios.post("/api/channels/join", { channelName: repo });
              history.push(
                `/channel/${repo.split("~")[0]}/${repo.split("~")[1]}/${
                  repo.split("~")[2]
                }`
              );
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
