import React from "react";

const ChannelLeft = ({ children, title = "SubChannels" }) => {
  return (
    <div className="has-background-primary" style={{ height: "100%" }}>
      <div className="has-background-light">
        <h1 className="subtitle is-3" style={{ padding: "0.7rem" }}>
          {title}
        </h1>
      </div>
      <div style={{ padding: "0.75rem" }}>
        <button className="button is-fullwidth is-light ">
          Join new SubChannel
        </button>
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
      </div>
    </div>
  );
};

export default ChannelLeft;
