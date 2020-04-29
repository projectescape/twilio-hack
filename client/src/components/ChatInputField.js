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
      <div className="control">
        <div className="">
          <div>
            <button
              className="button is-warning"
              onClick={() => {
                if (message !== "") {
                  currentChat.sendMessage(message, { type: "code" });
                  setMessage("");
                }
              }}
            >
              <span className="icon is-medium">
                <i className="fas fa-code"></i>
              </span>
            </button>
          </div>
          <div>
            <button
              className="button is-info"
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
        </div>
      </div>
    </div>
  );
};

export default ChatInputField;
