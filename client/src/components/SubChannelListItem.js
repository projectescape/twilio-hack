import React, { useState } from "react";
import SubChannelList from "./SubChannelList";

const SubChannelListItem = ({ file, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (file.type === "dir") {
    return (
      <div
        style={{
          //   padding: "auto",
          //   display: "flex",
          //   flexDirection: "column",
          //   justifyContent: "center",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          padding: "0.3rem 1rem",
          fontSize: "1.33rem",
          borderBottom: "2px solid #aaa",
        }}
      >
        <div onClick={() => setIsOpen(!isOpen)}>
          <i className="fas fa-folder"></i>

          <span style={{ paddingLeft: "0.5rem" }}>{file.name}</span>
        </div>
        {isOpen ? (
          <div style={{ paddingLeft: "0.5rem" }}>
            <SubChannelList parentPath={file.path} />
          </div>
        ) : null}
      </div>
    );
  }
  return (
    <div
      style={{
        // padding: "auto",
        // display: "flex",
        // flexDirection: "column",
        // justifyContent: "center",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        padding: "0.3rem 1rem",

        borderBottom: "2px solid #aaa",
        fontSize: "1.33rem",
      }}
    >
      {file.name}
    </div>
  );
};

export default SubChannelListItem;
