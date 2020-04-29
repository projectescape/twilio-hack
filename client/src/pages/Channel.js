import React, { useState, useEffect, useContext, useReducer } from "react";
import BannerLeft from "../components/BannerLeft";
import ChannelLeft from "../components/ChannelLeft";
import ChannelChat from "../components/ChannelChat";
import ResizablePanels from "../components/ResizablePanelsReact";
import ChannelSnippet from "../components/ChannelSnippet";
import ChannelChecklist from "../components/ChannelCheckList";
import CreateSubChannel from "../components/CreateSubChannel";
import { useParams } from "react-router-dom";
import axios from "axios";
import Context from "../context";

const messagesReducer = (state, action) => {
  switch (action.type) {
    case "setMessages":
      return action.payload;

    case "addNewMessage":
      return [...state, action.payload];

    default:
      return state;
  }
};

const SearchChannel = () => {
  // Fetch gloabal profile and chatClient
  const { profile, chatClient } = useContext(Context);

  // Get link parameters
  const { owner, repoName, subChannelName } = useParams();

  // Get list of subscribed channels for the repo
  const [subscribed, setSubscribed] = useState([
    `${owner}~${repoName}~general`,
  ]);

  // Toggle for create subChannel
  const [createToggle, setCreateToggle] = useState(false);

  // For current viewmode chat/snippet/todo
  const [viewMode, setViewMode] = useState("chat");

  // For retreiving subscribed subchannels
  useEffect(() => {
    axios
      .get(`/api/subchannels/subscribed/${owner}/${repoName}`)
      .then(({ data }) => {
        setSubscribed([`${owner}~${repoName}~general`, ...data]);
      })
      .catch((e) => {
        console.log("error", e.message);
      });
  }, [owner, repoName, subChannelName]);

  const [currentChat, setCurrentChat] = useState(null);

  const [messages, messagesDispatch] = useReducer(messagesReducer, null);

  const [toggleScroll, setToggleScroll] = useReducer((state) => {
    return !state;
  }, true);

  const setMessages = (payload) => {
    return messagesDispatch({ type: "setMessages", payload });
  };

  const addNewMessage = (payload) => {
    messagesDispatch({ type: "addNewMessage", payload });
    setToggleScroll(!toggleScroll);
  };

  const [prev, setPrev] = useState(null);

  const handleMessage = ({ state }) => {
    console.log("Handle Message", state);
    addNewMessage(state);
  };

  // For adding message listener
  useEffect(() => {
    let currentChat = null;
    console.log("creating currentChat");
    chatClient
      .getChannelByUniqueName(`${owner}~${repoName}~${subChannelName}`)
      .then((channel) => {
        setCurrentChat(channel);
        currentChat = channel;
        channel.on("messageAdded", handleMessage);
        console.log("Adding Listener");
      });
    return () => {
      console.log("Removing Listener", currentChat);

      currentChat.removeListener("messageAdded", () => {});
      currentChat.removeAllListeners();
      console.log("Removed");
      setCurrentChat(null);
    };
  }, [owner, repoName, subChannelName]);

  // For Getting Messages
  useEffect(() => {
    if (currentChat === null) {
      return;
    } else {
      currentChat.getMessages().then((messages) => {
        setMessages(messages.items.map((i) => i.state));
        setPrev({
          hasPrevPage: messages.hasPrevPage,
          prevPage: messages.prevPage,
        });
        console.log(messages);
      });
      return () => {
        setMessages(null);
        setPrev(null);
      };
    }
  }, [currentChat]);

  return (
    <>
      <BannerLeft title={`${owner}/${repoName}`} />
      <div
        style={{
          display: "inline-block",
          height: "100%",
          width: "calc(100vw - 30px)",
          verticalAlign: "top",
        }}
      >
        <ResizablePanels
          bkcolor="#e9e9e9"
          displayDirection="row"
          width="100%"
          height="100%"
          panelsSize={[30, 70]}
          sizeUnitMeasure="%"
          resizerColor="#353b48"
          resizerSize="10px"
        >
          <ChannelLeft
            owner={owner}
            repoName={repoName}
            myChannels={subscribed}
            setCreateToggle={() => setCreateToggle(!createToggle)}
          />
          {createToggle ? (
            <CreateSubChannel
              toggleMode={() => setCreateToggle(!createToggle)}
            />
          ) : viewMode === "snippet" ? (
            <ChannelSnippet
              toggleMode={() => setViewMode("chat")}
              currentChat={currentChat}
            />
          ) : viewMode === "checklist" ? (
            <ChannelChecklist
              toggleMode={() => setViewMode("chat")}
              currentChat={currentChat}
            />
          ) : (
            <ChannelChat
              toggleMode={(mode) => setViewMode(mode)}
              messages={messages}
              currentChat={currentChat}
              toggleScroll={toggleScroll}
            />
          )}
        </ResizablePanels>
      </div>
    </>
  );
};

export default SearchChannel;
