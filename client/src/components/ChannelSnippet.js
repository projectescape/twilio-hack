import { ControlledEditor as Editor } from "@monaco-editor/react";
import React, { useState } from "react";
const ChannelSnippet = ({
  toggleMode,
  currentChat,
  currentSnippet,
  snippet,
}) => {
  const [inputVal, setInputVal] = useState(snippet.value);
  const [lang, setLang] = useState(snippet.lang ? snippet.lang : "javascript");

  const handlePull = () => {
    setInputVal(snippet.value);
    setLang(snippet.lang);
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {renderTitle(
        "Snippet",
        toggleMode,
        inputVal,
        currentSnippet,
        handlePull,
        lang,
        snippet.value !== inputVal,
        currentChat
      )}
      <span className="select" style={{ width: "100%" }}>
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          style={{ width: "100%" }}
        >
          {languages.map((l) => (
            <option value={l}>{l}</option>
          ))}
        </select>
      </span>

      <div style={{ flexGrow: 1 }}>
        <Editor
          theme="dark"
          language={lang}
          value={inputVal}
          options={{ lineNumbers: "on" }}
          onChange={(ev, val) => setInputVal(val)}
        />
      </div>
    </div>
  );
};

const renderTitle = (
  title,
  toggleMode,
  inputVal,
  currentSnippet,
  handlePull,
  lang,
  subHeading,
  currentChat
) => {
  return (
    <div className="has-background-light" style={{ display: "flex" }}>
      <div style={{ flexGrow: 1 }}>
        <h1 className="subtitle is-3" style={{ padding: "0.7rem" }}>
          {title}
          {subHeading ? (
            <h1 className="subtitle is-6" style={{ display: "inline" }}>
              {" (Different from remote. Push/Pull to update/fetch remote)"}
            </h1>
          ) : null}
        </h1>
      </div>
      <div
        className="has-background-success"
        style={{
          height: "100%",
          padding: "1rem",
          cursor: "pointer",
        }}
        onClick={() => {
          currentSnippet.update({ value: inputVal, lang });
          currentChat.sendMessage("", { type: "snippet" });
        }}
      >
        <span className="icon">
          <i className="fas fa-arrow-up"></i>
        </span>
        <span style={{ paddingLeft: "0.5rem" }}>Push</span>
      </div>
      <div
        className="has-background-info"
        style={{
          height: "100%",

          padding: "1rem",
          cursor: "pointer",
        }}
        onClick={handlePull}
      >
        <span className="icon">
          <i className="fas fa-arrow-down"></i>
        </span>
        <span style={{ paddingLeft: "0.5rem" }}>Pull</span>
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

const languages = [
  "abap",
  "apex",
  "azcli",
  "bat",
  "cameligo",
  "clojure",
  "coffee",
  "cpp",
  "csharp",
  "csp",
  "css",
  "dart",
  "dockerfile",
  "fsharp",
  "go",
  "graphql",
  "handlebars",
  "html",
  "ini",
  "java",
  "javascript",
  "julia",
  "kotlin",
  "less",
  "lexon",
  "lua",
  "markdown",
  "mips",
  "msdax",
  "mysql",
  "objective-c",
  "pascal",
  "pascaligo",
  "perl",
  "pgsql",
  "php",
  "postiats",
  "powerquery",
  "powershell",
  "pug",
  "python",
  "r",
  "razor",
  "redis",
  "redshift",
  "restructuredtext",
  "ruby",
  "rust",
  "sb",
  "scheme",
  "scss",
  "shell",
  "solidity",
  "sophia",
  "sql",
  "st",
  "swift",
  "tcl",
  "test",
  "twig",
  "typescript",
  "vb",
  "xml",
  "yaml",
];

export default ChannelSnippet;
