import React from "react";
import ReactDOM from "react-dom";
import NavbarRouter from "./NavbarRouter";
import { BrowserRouter } from "react-router-dom";
import Homerouter from "./Homerouter";


ReactDOM.render(
  <>
  <NavbarRouter></NavbarRouter>
    <BrowserRouter>
      <Homerouter/>
    </BrowserRouter>
  </>,
  document.getElementById("root")
);
