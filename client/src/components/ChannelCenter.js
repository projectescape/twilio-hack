import React, { useEffect } from "react";

const ChannelCenter = ({ children, title = "SubChannel Name" }) => {
  useEffect(() => {
    const chatWindow = window.document.getElementById("chat-window");
    const xH = chatWindow.scrollHeight;
    chatWindow.scrollTo(0, xH);
  }, []);

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
    return messages;
  };

  return (
    <div style={{ height: "100%" }}>
      <div
        className=""
        style={{
          // paddingTop: 0,
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="has-background-light  ">
          <h1 className="subtitle is-3" style={{ padding: "0.7rem" }}>
            {title}
          </h1>
        </div>

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
            {renderMessages(10)}
          </div>
        </div>
        <div class="field has-addons">
          <div class="control is-expanded ">
            <textarea
              class="textarea"
              placeholder="10 lines of textarea"
              rows="2"
            ></textarea>
          </div>
          <div class="control">
            <div class="">
              <div>
                <button class="button is-warning">
                  <span className="icon is-medium">
                    <i class="fas fa-code"></i>
                  </span>
                </button>
              </div>
              <div>
                <button class="button is-info">
                  <span className="icon is-medium">
                    <i class="fas fa-paper-plane"></i>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelCenter;
