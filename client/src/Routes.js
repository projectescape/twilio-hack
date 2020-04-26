import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import Context from "./context";
import Landing from "./pages/Landing";
import SearchChannel from "./pages/SearchChannel";
import HandleLogin from "./components/HandleLogin";
import Navbar from "./components/Navbar";
import Channel from "./pages/Channel";

const Routes = () => {
  const { profile } = useContext(Context);

  // if (profile === null) {
  //   return (
  //     <Switch>
  //       <Route exact path="/handleLogin" component={HandleLogin} />
  //       <Landing />
  //     </Switch>
  //   );
  // }

  return (
    <>
      <Navbar />
      <div
        style={{
          height: "calc(100vh - 3.25rem - 4px)",
        }}
      >
        <Switch>
          <Channel />
          <SearchChannel />
        </Switch>
      </div>

      {/* <section
        className="hero is-dark is-fullheight-with-navbar"
        style={{
          display: "flex",
          overflow: "hidden",
        }}
      >
          <Channels />
      </section> */}
    </>
  );
};

export default Routes;
