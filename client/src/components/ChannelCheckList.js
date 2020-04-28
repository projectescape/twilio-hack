import React from "react";

const ChannelChecklist = ({ title = "CheckList", toggleMode }) => {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {renderTitle(title, toggleMode)}

      {renderChecklist()}
    </div>
  );
};

const renderTitle = (title, toggleMode) => {
  return (
    <div className="has-background-light" style={{ display: "flex" }}>
      <div style={{ flexGrow: 1 }}>
        <h1 className="subtitle is-3" style={{ padding: "0.7rem" }}>
          {title}
        </h1>
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

const renderChecklist = () => {
  return (
    <div
      style={{
        height: "100%",
        padding: "1rem",
        border: "2px solid red",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="field has-addons">
        <div className="control  is-expanded">
          <input className="input " type="text" placeholder="Add Item" />
        </div>
        <div className="control">
          <a className="button is-info">Add</a>
        </div>
      </div>
      <div
        style={{
          flexGrow: 1,
          overflow: "scroll",
        }}
      >
        {renderCheckItems(20)}
      </div>
    </div>
  );
};

const renderCheckItems = (num) => {
  const items = [];
  for (let i = 0; i < num; i++) {
    items.push(
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          borderBottom: "2px solid #bbb",
        }}
      >
        <div>
          <span className="icon is-large has-background-success">
            <i className="far fa-lg fa-check-square"></i>
          </span>
        </div>
        <div
          style={{
            flexGrow: "1",
            padding: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: "1rem",
            paddingRight: "1rem",
            fontSize: "1.33em",
          }}
        >
          Hello
        </div>
        <div>
          <span className="icon is-large has-background-danger">
            <i className="fas fa-lg fa-times"></i>
          </span>
        </div>
      </div>
    );
  }
  return items;
};

export default ChannelChecklist;
