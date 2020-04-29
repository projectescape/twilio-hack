import React, { useEffect, useContext } from "react";
import ChatInputField from "./ChatInputField";
import ChannelChatItem from "./ChannelChatItem";
import { useParams } from "react-router-dom";

const ChannelChat = ({
  title = "SubChannel Name",
  toggleMode,
  messages,
  currentChat,
  toggleScroll,
}) => {
  const { owner, repoName, subChannelName } = useParams();

  useEffect(() => {
    setTimeout(() => {
      const chatWindow = window.document.getElementById("chat-window");
      const xH = chatWindow.scrollHeight;
      chatWindow.scrollTo(0, xH);
    }, 2000);
  }, [owner, repoName, subChannelName]);

  useEffect(() => {
    console.log("Scroll Down");
    const chatWindow = window.document.getElementById("chat-window");
    const xH = chatWindow.scrollHeight;
    chatWindow.scrollTo(0, xH);
  }, [toggleScroll]);

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {renderTitle(title, toggleMode)}

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
          {renderMessages(messages)}
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
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
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
        <span>Snippet</span>
      </div>
      <div
        className="has-background-success"
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          cursor: "pointer",
        }}
        onClick={() => {
          toggleMode("checklist");
        }}
      >
        <span className="icon">
          <i className="fas fa-tasks"></i>{" "}
        </span>
        <span>CheckList</span>
      </div>
    </div>
  );
};

const renderMessages = (messages) => {
  if (messages === null) {
    return (
      <progress class="progress is-medium is-dark" max="100">
        45%
      </progress>
    );
  }
  const ans = [];
  for (let i = 0; i < messages.length; i++) {
    if (messages[i].attributes.type === "chat") {
      ans.push(<ChannelChatItem message={messages[i]} />);
    }
  }

  return ans;
};

export default ChannelChat;
