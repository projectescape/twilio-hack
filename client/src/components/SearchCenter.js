import React from "react";

const SearchCenter = ({ children, title = "Search Channels" }) => {
  const renderRepos = () => {
    return (
      <div class="breadcrumb">
        <ul>
          <li class="is-active">
            <a href="#">
              <span className="icon is-small">
                <i class="fas fa-user" />
              </span>
              projectEscape{" "}
            </a>
          </li>
          <li>
            <a href="#">
              <span className="icon is-small">
                <i class="fas fa-code-branch" />
              </span>
              twilio-hack
            </a>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div className="" style={{ paddingTop: 0, height: "100%" }}>
      <div className="has-background-light  ">
        <h1 className="subtitle is-3" style={{ padding: "0.7rem" }}>
          {title}
        </h1>
      </div>
      <div
        className="columns"
        style={{ padding: "1rem", marginBottom: "0", paddingBottom: "0" }}
      >
        <div className="column is-10">
          <div class="control ">
            <input class="input" type="text" placeholder="Loading input" />
          </div>
        </div>
        <div className="column is-2">
          <button className="button is-fullwidth">Search</button>
        </div>
      </div>
      <div
        className="disable-scrollbars"
        style={{
          height: "100%",
          overflowY: "scroll",
          paddingLeft: "2rem",
          paddingTop: "1rem",
        }}
      >
        {renderRepos()}
        {renderRepos()}
      </div>
    </div>
  );
};

export default SearchCenter;
