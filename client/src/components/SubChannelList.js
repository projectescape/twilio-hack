import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SubChannelListItem from "./SubChannelListItem";

const SubChannelList = ({ parentPath = "/" }) => {
  const [content, setContent] = useState(null);
  const { owner, repoName } = useParams();
  const [progressDisplay, setProgress] = useState(false);

  useEffect(() => {
    axios
      .post("/api/repos/content/", {
        owner,
        repoName,
        path: parentPath,
      })
      .then(({ data }) => {
        setContent(data);
      });
  }, []);

  if (content !== null) {
    return (
      <>
        {progressDisplay ? (
          <progress className="progress is-medium is-dark" max="100">
            45%
          </progress>
        ) : null}

        {content.map((file) => (
          <SubChannelListItem
            file={file}
            key={file.name}
            setProgress={() => {
              setProgress(true);
            }}
          />
        ))}
      </>
    );
  }

  return (
    <progress className="progress is-medium is-dark" max="100">
      45%
    </progress>
  );
};

export default SubChannelList;
