import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Game from "./Game";
import items from "../data";
import { GameContext } from "./GameContext";
import useInterval from "../hooks/use-interval.hook";

function App() {
  const { numCookies, setNumCookies, cookiesPerSecond } = React.useContext(
    GameContext
  );
  useInterval(() => {
    setNumCookies(numCookies + cookiesPerSecond);
  }, 1000);
  return (
    <>
      <GlobalStyles />
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/game">
          <Game items={items} />
        </Route>
      </Router>
    </>
  );
}

export default App;
