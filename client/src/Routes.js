import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import Context from "./context";
import Landing from "./pages/Landing";
import Channels from "./pages/Channels";
import HandleLogin from "./components/HandleLogin";
import Navbar from "./components/Navbar";

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
        <Channels />
      </div>

      {/* <section
        className="hero is-dark is-fullheight-with-navbar"
        style={{
          display: "flex",
          overflow: "hidden",
        }}
      >
        <Switch>
          <Channels />
        </Switch>
      </section> */}
    </>
  );
};

export default Routes;
