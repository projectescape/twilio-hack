import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import Context from "./context";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import HandleLogin from "./components/HandleLogin";

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
    <Switch>
      <Home />
    </Switch>
  );
};

export default Routes;
