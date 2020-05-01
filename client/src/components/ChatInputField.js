import React, { useState } from "react";

const ChatInputField = ({ currentChat }) => {
  const [message, setMessage] = useState("");

  return (
    <div className="field has-addons">
      <div className="control is-expanded ">
        <textarea
          className="textarea has-fixed-size"
          placeholder="Enter Message or code"
          rows="2"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (message !== "") {
                currentChat.sendMessage(message, { type: "chat" });
                setMessage("");
              }
            }
          }}
        ></textarea>
      </div>
      <button
        className="button is-info"
        style={{ height: "auto" }}
        onClick={() => {
          if (message !== "") {
            currentChat.sendMessage(message, { type: "chat" });
            setMessage("");
          }
        }}
      >
        <span className="icon is-medium">
          <i className="fas fa-paper-plane"></i>
        </span>
      </button>
    </div>
  );
};

export default ChatInputField;
