import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {AppProvider} from './stripeMenu/context/context';
ReactDOM.render(<AppProvider><App /></AppProvider>, document.getElementById("root"));
