import dayjs from "dayjs";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Context from "../context";
import ChatInputField from "./ChatInputField";

const ChannelChat = ({ toggleMode, messages, currentChat, toggleScroll }) => {
  const { owner, repoName, subChannelName } = useParams();
  const { profile } = useContext(Context);

  useEffect(() => {
    setTimeout(() => {
      const chatWindow = window.document.getElementById("chat-window");
      if (chatWindow !== null) {
        const xH = chatWindow.scrollHeight;
        chatWindow.scrollTo(0, xH);
      }
    }, 2000);
  }, [owner, repoName, subChannelName]);

  useEffect(() => {
    const chatWindow = window.document.getElementById("chat-window");
    if (chatWindow !== null) {
      const xH = chatWindow.scrollHeight;
      chatWindow.scrollTo(0, xH);
    }
  }, [toggleScroll]);

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {renderTitle(subChannelName.replace(/~/g, "/"), toggleMode)}

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
        <div id="chat-window" style={{ overflow: "inherit" }}>
          {renderMessages(messages, profile)}
        </div>
      </div>

      <ChatInputField currentChat={currentChat} />
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
        className="has-background-info"
        style={{
          height: "100%",
          padding: "1rem",
          cursor: "pointer",
        }}
        onClick={() => {
          toggleMode("snippet");
        }}
      >
        <span className="icon">
          <i className="fas fa-code"></i>
        </span>
        <span style={{ paddingLeft: "0.5rem" }}>Snippet</span>
      </div>
      <div
        className="has-background-success"
        style={{
          height: "100%",
          padding: "1rem",
          cursor: "pointer",
        }}
        onClick={() => {
          toggleMode("checklist");
        }}
      >
        <span className="icon">
          <i className="fas fa-tasks"></i>{" "}
        </span>
        <span style={{ paddingLeft: "0.5rem" }}>CheckList</span>
      </div>
    </div>
  );
};

const renderMessages = (messages, profile) => {
  if (messages === null) {
    return (
      <progress className="progress is-medium is-dark" max="100">
        45%
      </progress>
    );
  }
  const ans = [];
  for (let i = 0; i < messages.length; i++) {
    if (messages[i].attributes.type === "chat") {
      ans.push(
        <div
          key={messages[i].sid}
          style={{
            display: "flex",
            flexDirection:
              messages[i].author === profile.username ? "row-reverse" : "row",
            paddingBottom: "10px",
          }}
        >
          <div
            className="has-background-grey-lighter"
            style={{
              maxWidth: "70%",
              minWidth: "10%",
              overflowWrap: "break-word",
            }}
          >
            <div
              className="has-background-grey-light is-size-7"
              style={{ padding: "3px" }}
            >
              <h1>{messages[i].author}</h1>
            </div>
            <div style={{ padding: "7px" }}>
              {messages[i].body.split("\n").map((item, i) => (
                <p key={i}>{item}</p>
              ))}
            </div>

            <div className="has-background-grey-light is-size-7">
              <h1 style={{ padding: "3px" }}>
                {dayjs(messages[i].timestamp).format("h mm a")}
              </h1>
            </div>
          </div>
        </div>
      );
    }
    if (
      messages[i].attributes.type === "snippet" ||
      messages[i].attributes.type === "checklist"
    ) {
      ans.push(
        <div
          key={messages[i].sid}
          style={{
            display: "flex",
            flexDirection: "row",
            paddingBottom: "10px",
            justifyContent: "center",
          }}
        >
          <div
            className="has-background-grey-lighter"
            style={{
              maxWidth: "70%",
              minWidth: "10%",
              overflowWrap: "break-word",
            }}
          >
            <div style={{ padding: "7px" }}>
              {`${messages[i].author} has updated the ${messages[i].attributes.type}`}
            </div>
            <div className="has-background-grey-light is-size-7">
              <h1 style={{ padding: "3px" }}>
                {dayjs(messages[i].timestamp).format("h mm a")}
              </h1>
            </div>
          </div>
        </div>
      );
    }
  }

  return ans;
};

export default ChannelChat;
