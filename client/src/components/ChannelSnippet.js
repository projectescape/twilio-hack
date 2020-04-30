import React, { useState } from "react";

const ChannelSnippet = ({
  toggleMode,
  currentChat,
  currentSnippet,
  snippet,
}) => {
  const [inputVal, setInputVal] = useState(snippet.value);

  const handlePull = () => {
    setInputVal(snippet.value);
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {renderTitle("Snippet", toggleMode, inputVal, currentSnippet, handlePull)}

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
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
};

const renderTitle = (
  title,
  toggleMode,
  inputVal,
  currentSnippet,
  handlePull
) => {
  return (
    <div className="has-background-light" style={{ display: "flex" }}>
      <div style={{ flexGrow: 1 }}>
        <h1 className="subtitle is-3" style={{ padding: "0.7rem" }}>
          {title}
        </h1>
      </div>
      <div
        className="has-background-success"
        style={{
          height: "100%",
          padding: "1rem",
          cursor: "pointer",
        }}
        onClick={() => {
          currentSnippet.update({ value: inputVal });
        }}
      >
        <span className="icon">
          <i className="fas fa-arrow-up"></i>
        </span>
        <span style={{ paddingLeft: "0.5rem" }}>Push</span>
      </div>
      <div
        className="has-background-info"
        style={{
          height: "100%",

          padding: "1rem",
          cursor: "pointer",
        }}
        onClick={handlePull}
      >
        <span className="icon">
          <i className="fas fa-arrow-down"></i>
        </span>
        <span style={{ paddingLeft: "0.5rem" }}>Pull</span>
      </div>
      <div
        className="has-background-danger"
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          cursor: "pointer",
        }}
        onClick={toggleMode}
      >
        <span className="icon">
          <i className="fas fa-2x fa-times"></i>
        </span>
      </div>
    </div>
  );
};

export default ChannelSnippet;
