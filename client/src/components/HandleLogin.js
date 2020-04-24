import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";

import Context from "../context";

const HandleLogin = () => {
  const { profile, handleLogin } = useContext(Context);

  useEffect(() => {
    if (profile === null) handleLogin();
  }, [handleLogin, profile]);

  return profile === null ? <div>Handling login</div> : <Redirect to="/" />;
};

export default HandleLogin;
