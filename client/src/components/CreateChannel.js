import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CreateChannel = ({ title = "Create Channels", username }) => {
  const [result, setResult] = useState([]);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    axios.get("/api/channels/notcreated").then(({ data }) => {
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
      {renderTitle(title)}
      <div
        style={{
          padding: "1rem",
          overflowY: "auto",
          flexGrow: 1,
        }}
      >
        {renderRepos(result, username, searched)}
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

const renderRepos = (result, username, searched) => {
  if (searched === false)
    return (
      <progress class="progress is-medium is-dark" max="100">
        45%
      </progress>
    );
  console.log("Rendering Repos");
  return result.map((repo) => (
    <div className="breadcrumb">
      <ul>
        <li className="is-active">
          <Link>
            <span className="icon is-small">
              <i className="fas fa-user" />
            </span>
            {username}
          </Link>
        </li>
        <li>
          <Link
            onClick={async () => {
              await axios.post("/api/channels/create", { repoName: repo });
            }}
          >
            <span className="icon is-small">
              <i className="fas fa-code-branch" />
            </span>
            {repo}
          </Link>
        </li>
      </ul>
    </div>
  ));
};

export default CreateChannel;
