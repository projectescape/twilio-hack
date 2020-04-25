import React from "react";

const SearchLeft = ({ children, title }) => {
  return (
    <div className="has-background-primary" style={{ height: "100%" }}>
      <div className="has-background-light">
        <h1 className="subtitle is-3" style={{ padding: "0.7rem" }}>
          {title}
        </h1>
      </div>
      <div style={{ padding: "0.75rem" }}>
        <aside className="menu">
          <ul className="menu-list">
            <li>
              <a>Dashboard</a>
            </li>
            <li>
              <a>Customers</a>
            </li>
            <li>
              <a className="is-active">Manage Your Team</a>
              <ul>
                <li>
                  <a>Members</a>
                </li>
                <li>
                  <a>Plugins</a>
                </li>
                <li>
                  <a>Add a member</a>
                </li>
              </ul>
            </li>
          </ul>
        </aside>
        <button className="button is-fullwidth is-light ">
          Create New Channel
        </button>
      </div>
    </div>
  );
};

export default SearchLeft;
