import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SubChannelListItem from "./SubChannelListItem";

const SubChannelList = ({ parentPath = "/" }) => {
  const [content, setContent] = useState(null);
  const { owner, repoName } = useParams();

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
    return content.map((file, index) => (
      <SubChannelListItem file={file} index={index} />
    ));
  }

  return (
    <progress class="progress is-medium is-dark" max="100">
      45%
    </progress>
  );
};

export default SubChannelList;
