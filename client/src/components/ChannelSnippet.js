import React from "react";

const ChannelSnippet = ({ title = "Snippet" }) => {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {renderTitle(title)}

      {renderInputField()}
    </div>
  );
};

const renderTitle = (title) => {
  return (
    <div
      className="has-background-light"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <div>
        <h1 className="subtitle is-3" style={{ padding: "0.7rem" }}>
          {title}
        </h1>
      </div>
      <div class="buttons has-addons is-marginless">
        <button class="button" style={{ height: "100%" }}>
          <span class="icon">
            <i class="fas fa-arrow-down"></i>
          </span>
          <span>Pull</span>
        </button>
        <button class="button" style={{ height: "100%" }}>
          <span class="icon">
            <i class="fas fa-arrow-up"></i>
          </span>
          <span>Push</span>
        </button>
        <button class="button is-danger" style={{ height: "100%" }}>
          <span class="icon">
            <i class="fas fa-times"></i>
          </span>
        </button>
      </div>
    </div>
  );
};

const renderInputField = () => {
  return (
    <div style={{ flexGrow: 1 }}>
      <textarea
        wrap="off"
        style={{
          resize: "none",
          width: "100%",
          height: "100%",
          background: "inherit",
          border: "none",
          padding: "1rem",
        }}
      ></textarea>
    </div>
  );
};

export default ChannelSnippet;