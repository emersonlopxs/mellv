import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";

import "./index.css";
import Camaleao from "./Camaleao";
import Store from "./Store";

ReactDOM.render(
  <HashRouter>
    <Store>
      <Camaleao />
    </Store>
  </HashRouter>,
  document.getElementById("camaleao")
);
