import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "./context";
import Routes from "./Routes";

function App() {
  return (
    <Provider>
      <Router>
        <Routes />
      </Router>
    </Provider>
  );
}

export default App;
