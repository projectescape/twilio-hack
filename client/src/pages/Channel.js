import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import BannerLeft from "../components/BannerLeft";
import ChannelChat from "../components/ChannelChat";
import ChannelChecklist from "../components/ChannelCheckList";
import ChannelLeft from "../components/ChannelLeft";
import ChannelSnippet from "../components/ChannelSnippet";
import CreateSubChannel from "../components/CreateSubChannel";
import JoinSubChannel from "../components/JoinSubChannel";
import ResizablePanels from "../components/ResizablePanelsReact";
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
  const history = useHistory();
  // Fetch gloabal profile and chatClient
  const { profile, chatClient, syncClient } = useContext(Context);

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

  const refetchSubscribed = async () => {
    await axios
      .get(`/api/subchannels/subscribed/${owner}/${repoName}`)
      .then(({ data }) => {
        setSubscribed([`${owner}~${repoName}~general`, ...data]);
        // setCreateToggle(false);
      })
      .catch((e) => {
        console.log("error", e.message);
      });
    history.push(`/channel/${owner}/${repoName}/general`);
  };

  // For retreiving subscribed subchannels
  useEffect(() => {
    setCreateToggle(false);
    setViewMode("chat");
    axios
      .get(`/api/subchannels/subscribed/${owner}/${repoName}`)
      .then(({ data }) => {
        setSubscribed([`${owner}~${repoName}~general`, ...data]);
      })
      .catch((e) => {
        console.log("error", e.message);
      });
  }, [owner, repoName, subChannelName]);

  // State contaning handlers for mutating, listening
  const [currentChat, setCurrentChat] = useState(null);
  const [currentSnippet, setCurrentSnippet] = useState(null);
  const [currentCheckList, setCurrentChecklist] = useState(null);

  // State containing values
  const [messages, messagesDispatch] = useReducer(messagesReducer, null);
  const [snippet, setSnippet] = useState(null);
  const [checklist, setChecklist] = useState(null);

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
    addNewMessage(state);
  };

  const handleSnippet = (s) => {
    setSnippet(s.value);
  };
  const handleCheckList = (s) => {
    setChecklist(s.value);
  };

  // For adding message,sync listener
  useEffect(() => {
    setMessages(null);
    setPrev(null);
    setCurrentChat(null);
    setCurrentChecklist(null);
    setCurrentSnippet(null);
    let currentChat = null;
    let currentSnippet = null;
    let currentCheckList = null;
    chatClient
      .getChannelByUniqueName(`${owner}~${repoName}~${subChannelName}`)
      .then((channel) => {
        setCurrentChat(channel);
        currentChat = channel;
        channel.on("messageAdded", handleMessage);
        currentChat.getMessages().then((messages) => {
          setMessages(messages.items.map((i) => i.state));
          setPrev({
            hasPrevPage: messages.hasPrevPage,
            prevPage: messages.prevPage,
          });
        });
      });
    syncClient
      .document(`${owner}~${repoName}~${subChannelName}~snippet`)
      .then((doc) => {
        setCurrentSnippet(doc);
        currentSnippet = doc;
        doc.on("updated", handleSnippet);
        setSnippet(doc.value);
      });
    syncClient
      .document(`${owner}~${repoName}~${subChannelName}~checklist`)
      .then((doc) => {
        setCurrentChecklist(doc);
        currentCheckList = doc;
        doc.on("updated", handleCheckList);
        setChecklist(doc.value);
      });
    return () => {
      currentChat.removeListener("messageAdded", () => {});
      currentChat.removeAllListeners();
      currentSnippet.removeListener("updated", () => {});
      currentSnippet.removeAllListeners();
      currentCheckList.removeListener("updated", () => {});
      currentCheckList.removeAllListeners();
    };
  }, [owner, repoName, subChannelName]);

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
            profile={profile}
            refetchSubscribed={refetchSubscribed}
          />
          {createToggle ? (
            owner === profile.username ? (
              <CreateSubChannel
                toggleMode={() => setCreateToggle(!createToggle)}
              />
            ) : (
              <JoinSubChannel
                toggleMode={() => setCreateToggle(!createToggle)}
              />
            )
          ) : viewMode === "snippet" ? (
            <ChannelSnippet
              toggleMode={() => setViewMode("chat")}
              currentChat={currentChat}
              currentSnippet={currentSnippet}
              snippet={snippet}
            />
          ) : viewMode === "checklist" ? (
            <ChannelChecklist
              toggleMode={() => setViewMode("chat")}
              currentChat={currentChat}
              currentCheckList={currentCheckList}
              checklist={checklist}
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
