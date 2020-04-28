import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import Context from "./context";
import Landing from "./pages/Landing";
import Search from "./pages/Search";
import HandleLogin from "./components/HandleLogin";
import Navbar from "./components/Navbar";
import Channel from "./pages/Channel";

const Routes = () => {
  const { profile } = useContext(Context);

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
          <Route exact path="/channel/:id" component={Channel} />
          <Search />
        </Switch>
      </div>
    </>
  );
};

export default Routes;
