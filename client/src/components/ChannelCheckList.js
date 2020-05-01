import React, { useState } from "react";
import uuid from "react-uuid";

const ChannelChecklist = ({
  toggleMode,
  currentChat,
  currentCheckList,
  checklist,
}) => {
  const [inputVal, setInputVal] = useState("");
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {renderTitle("CheckList", toggleMode)}

      <div
        className="columns"
        style={{ padding: "1rem", marginBottom: "0", paddingBottom: "0" }}
      >
        <div className="column is-10">
          <div className="control ">
            <input
              className="input"
              type="text"
              placeholder="Add to list"
              value={inputVal}
              onChange={(e) => {
                setInputVal(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (inputVal !== "") {
                    currentCheckList.update({
                      items: [
                        {
                          key: uuid(),
                          body: inputVal,
                          checked: false,
                        },
                        ...checklist.items,
                      ],
                    });
                    currentChat.sendMessage("", { type: "checklist" });
                    setInputVal("");
                  }
                }
              }}
            />
          </div>
        </div>
        <div className="column is-2">
          <button
            className="button is-fullwidth"
            onClick={() => {
              if (inputVal !== "") {
                currentCheckList.update({
                  items: [
                    {
                      key: uuid(),
                      body: inputVal,
                      checked: false,
                    },
                    ...checklist.items,
                  ],
                });
                currentChat.sendMessage("", { type: "checklist" });
                setInputVal("");
              }
            }}
          >
            Add
          </button>
        </div>
      </div>

      {renderChecklist(checklist.items, currentCheckList, currentChat)}
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

const renderChecklist = (items, currentCheckList, currentChat) => {
  return (
    <div
      style={{
        height: "100%",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          flexGrow: 1,
          overflowY: "auto",
        }}
      >
        {items !== undefined
          ? items.map((item, i) => {
              return (
                <div
                  className={i % 2 === 0 ? "has-background-light" : ""}
                  key={item.key}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      currentCheckList.update({
                        items: items.map((i) => {
                          if (i.key !== item.key) return i;
                          return { ...i, checked: !i.checked };
                        }),
                      });
                      currentChat.sendMessage("", { type: "checklist" });
                    }}
                  >
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
                      textDecoration: item.checked ? "line-through" : "",
                    }}
                  >
                    {item.body}
                  </div>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      currentCheckList.update({
                        items: items.filter((i) => i.key !== item.key),
                      });
                      currentChat.sendMessage("", { type: "checklist" });
                    }}
                  >
                    <span className="icon is-large has-background-danger">
                      <i className="fas fa-lg fa-times"></i>
                    </span>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default ChannelChecklist;
