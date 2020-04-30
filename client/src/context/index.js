import axios from "axios";
import React, { useReducer } from "react";
import { Client as twilioChat } from "twilio-chat";
import twilioSync from "twilio-sync";

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "fetchProfile":
      return { ...state, profile: action.payload };
    case "handleLogin":
      return { ...state, ...action.payload };
    case "handleLogout":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    profile: null,
    chatClient: null,
    syncClient: null,
  });

  const fetchProfile = async () => {
    const profile = await axios.get("/auth/current_user");
    dispatch({ type: "fetchProfile", payload: profile.data });
  };

  const handleLogin = async () => {
    const profile = await axios.get("/auth/current_user");
    const { data } = await axios.get("/twilio/token");
    const chatClient = await twilioChat.create(data);
    const syncClient = await new twilioSync(data);
    chatClient.on("tokenAboutToExpire", () =>
      updateToken(chatClient, syncClient)
    );
    console.log("chatClient", chatClient);
    dispatch({
      type: "handleLogin",
      payload: {
        profile: profile.data,
        chatClient,
        syncClient,
      },
    });
  };

  const handleLogout = async () => {
    await axios.get("/auth/logout");
    dispatch({
      type: "handleLogout",
      payload: {
        profile: null,
        chatClient: null,
      },
    });
  };

  const updateToken = async (chatClient, syncClient) => {
    const { data } = await axios.get("/twilio/token");
    chatClient.updateToken(data);
    syncClient.updateToken(data);
  };

  return (
    <Context.Provider
      value={{
        ...state,
        fetchProfile,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
