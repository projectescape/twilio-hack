import React, { useState } from "react";
import SubChannelList from "./SubChannelList";
import { Link, useParams, useHistory } from "react-router-dom";
import axios from "axios";
import getClassNameForExtension from "font-awesome-filetypes";

const SubChannelListItem = ({ file, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { repoName } = useParams();
  const history = useHistory();
  const { owner } = useParams();

  if (file.type === "dir") {
    return (
      <div
        style={{
          paddingLeft: "1rem",
          paddingRight: "1rem",
          paddingTop: "0.6rem",
          fontSize: "1.33rem",
          cursor: "pointer",
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
    <Link
      style={{
        paddingLeft: "1rem",
        paddingRight: "1rem",
        paddingTop: "0.6rem",
        fontSize: "1.33rem",
        display: "block",
      }}
      onClick={async () => {
        await axios.post("/api/subchannels/create", {
          path: file.path,
          repoName,
        });
        history.push(
          `/channel/${owner}/${repoName}/${file.path.replace(/\//g, "~")}`
        );
      }}
    >
      <i
        className={`fas ${getClassNameForExtension(
          file.name.split(".").pop()
        )}`}
      ></i>

      <span style={{ paddingLeft: "0.5rem" }}>{file.name}</span>
    </Link>
  );
};

export default SubChannelListItem;
