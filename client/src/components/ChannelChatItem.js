import React, { useContext } from "react";
import dayjs from "dayjs";
import Context from "../context";

const ChannelChatItem = ({ message }) => {
  const { profile } = useContext(Context);
  return (
    <div
      key={message.sid}
      style={{
        display: "flex",
        flexDirection:
          message.author === profile.username ? "row-reverse" : "row",
        paddingBottom: "10px",
      }}
    >
      <div
        className="has-background-grey-lighter"
        style={{ maxWidth: "70%", minWidth: "10%", overflowWrap: "break-word" }}
      >
        <div
          className="has-background-grey-light is-size-7"
          style={{ padding: "3px" }}
        >
          <h1>{message.author}</h1>
        </div>
        <div style={{ padding: "7px" }}>
          {message.body.split("\n").map((item, i) => (
            <p key={i}>{item}</p>
          ))}
        </div>

        <div className="has-background-grey-light is-size-7">
          <h1 style={{ padding: "3px" }}>
            {dayjs(message.timestamp).format("h mm a")}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ChannelChatItem;
