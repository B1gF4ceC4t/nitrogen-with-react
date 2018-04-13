import React from "react";
import mirror, { render, Router } from "mirrorx";
import App from "./App";

mirror.defaults({
  historyMode: "hash"
});

render(
  <Router basename="/" hashType="hashbang">
    <App />
  </Router>,
  document.querySelector("#root")
);
