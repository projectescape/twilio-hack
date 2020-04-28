import React, { useEffect } from "react";

const ChannelChat = ({ children, title = "SubChannel Name" }) => {
  useEffect(() => {
    const chatWindow = window.document.getElementById("chat-window");
    const xH = chatWindow.scrollHeight;
    chatWindow.scrollTo(0, xH);
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

      {renderMessages(10)}

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
      <div className="buttons has-addons is-marginless">
        <button className="button" style={{ height: "100%" }}>
          <span className="icon">
            <i className="fas fa-code"></i>{" "}
          </span>
          <span>Snippet</span>
        </button>
        <button className="button" style={{ height: "100%" }}>
          <span className="icon">
            <i className="fas fa-tasks"></i>{" "}
          </span>
          <span>CheckList</span>
        </button>
      </div>
    </div>
  );
};

const renderMessages = (num) => {
  const messages = [];
  for (let i = 0; i < num; i++)
    messages.push(
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            paddingBottom: "10px",
          }}
        >
          <div
            className="has-background-grey-lighter"
            style={{ maxWidth: "70%", overflowWrap: "break-word" }}
          >
            <div
              className="has-background-grey-light is-size-7"
              style={{ padding: "3px" }}
            >
              <h1>userName</h1>
            </div>
            <div style={{ padding: "7px" }}>Message Sent</div>
            <div className="has-background-grey-light is-size-7">
              <h1 style={{ padding: "3px" }}>Time</h1>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            paddingBottom: "10px",
          }}
        >
          <div
            className="has-background-grey-lighter"
            style={{ maxWidth: "70%", overflowWrap: "break-word" }}
          >
            <div
              className="has-background-grey-light is-size-7"
              style={{ padding: "3px" }}
            >
              <h1>userName</h1>
            </div>
            <div style={{ padding: "7px" }}>Message Sent</div>
            <div className="has-background-grey-light is-size-7">
              <h1 style={{ padding: "3px" }}>Time</h1>
            </div>
          </div>
        </div>
      </>
    );

  return (
    <div
      style={{
        overflowY: "auto",
        paddingLeft: "2rem",
        paddingRight: "2rem",
        paddingTop: "1rem",
        flexGrow: 1,
        display: "flex",
        justifyContent: "flex-end",
        flexDirection: "column",
      }}
    >
      <div
        id="chat-window"
        className="disable-scrollbars"
        style={{ overflow: "inherit" }}
      >
        {messages}
      </div>
    </div>
  );
};

const renderInputField = () => {
  return (
    <div className="field has-addons">
      <div className="control is-expanded ">
        <textarea
          className="textarea has-fixed-size"
          placeholder="Enter Message or code"
          rows="2"
        ></textarea>
      </div>
      <div className="control">
        <div className="">
          <div>
            <button className="button is-warning">
              <span className="icon is-medium">
                <i className="fas fa-code"></i>
              </span>
            </button>
          </div>
          <div>
            <button className="button is-info">
              <span className="icon is-medium">
                <i className="fas fa-paper-plane"></i>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelChat;
