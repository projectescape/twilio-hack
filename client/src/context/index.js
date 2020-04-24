import axios from "axios";
import React, { useReducer } from "react";
import twilioChat from "twilio-chat";

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
  });

  const fetchProfile = async () => {
    const profile = await axios.get("/auth/current_user");
    dispatch({ type: "fetchProfile", payload: profile.data });
  };

  const handleLogin = async () => {
    const profile = await axios.get("/auth/current_user");
    const { data } = await axios.get("/twilio/token");
    const chatClient = await new twilioChat(data);
    dispatch({
      type: "handleLogin",
      payload: {
        profile: profile.data,
        chatClient,
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
