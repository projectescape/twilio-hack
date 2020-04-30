import React, { useContext, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import HandleLogin from "./components/HandleLogin";
import Navbar from "./components/Navbar";
import Context from "./context";
import Channel from "./pages/Channel";
import Landing from "./pages/Landing";
import Search from "./pages/Search";

const Routes = () => {
  const { profile, handleLogin } = useContext(Context);

  useEffect(() => {
    if (profile === null) {
      handleLogin();
    }
  }, []);

  if (profile === null) {
    return (
      <Switch>
        <Route exact path="/handleLogin" component={HandleLogin} />
        <Landing />
      </Switch>
    );
  }

  return (
    <>
      <Navbar />
      <div
        style={{
          height: "calc(100vh - 3.25rem - 4px)",
        }}
      >
        <Switch>
          <Route
            exact
            path="/channel/:owner/:repoName/:subChannelName"
            component={Channel}
          />
          <Search />
        </Switch>
      </div>
    </>
  );
};

export default Routes;
