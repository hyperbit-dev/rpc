import React from "react";
import ReactDOM from "react-dom/client";
import Router from "../router";
import "../index.css";

const root = document.createElement("div");
root.id = "crx-root";
document.body.append(root);

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
