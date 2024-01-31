import * as process from "process";

window.global = window;
window.process = process;
window.Buffer = [];
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./css/index.css";
import "./css/App.css";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
