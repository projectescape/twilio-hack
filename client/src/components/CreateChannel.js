import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

const CreateChannel = ({ title = "Create Channels", username }) => {
  const [result, setResult] = useState([]);
  const [searched, setSearched] = useState(false);
  const [showProgress, setShowProgress] = useState(false);

  const history = useHistory();

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
        {renderRepos(result, username, searched, history, setShowProgress)}
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

const renderRepos = (result, username, searched, history, setShowProgress) => {
  if (searched === false)
    return (
      <progress className="progress is-medium is-dark" max="100">
        45%
      </progress>
    );
  return result.map((repo) => (
    <div className="breadcrumb" key={repo}>
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
              setShowProgress(true);
              await axios.post("/api/channels/create", { repoName: repo });
              history.push(`/channel/${username}/${repo}/general`);
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
