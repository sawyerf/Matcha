import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import axios from "axios";

axios.defaults.baseURL = "http://192.168.56.102:3000/api";
axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
