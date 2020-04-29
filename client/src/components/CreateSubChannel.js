import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SubChannelList from "./SubChannelList";

const CreateSubChannel = ({ toggleMode }) => {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {renderTitle("Create SubChannel", toggleMode)}
      <div
        style={{
          padding: "1rem",
          overflowY: "auto",
          flexGrow: 1,
        }}
      >
        <SubChannelList />
      </div>
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
        className="has-background-danger"
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          cursor: "pointer",
        }}
        onClick={toggleMode}
      >
        <span className="icon">
          <i className="fas fa-2x fa-times"></i>
        </span>
      </div>
    </div>
  );
};

export default CreateSubChannel;
