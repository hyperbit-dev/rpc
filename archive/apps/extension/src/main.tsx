import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./router";
import "./index.css";

const root = document.createElement("div");
root.id = "crx-root";
document.body.append(root);

const GOOGLE_CLIENT_ID =
  "321546124281-d5ci5sl2i63dcsiafj94nqdp12gdl5hu.apps.googleusercontent.com";

ReactDOM.createRoot(root).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <React.StrictMode>
      <Router />
    </React.StrictMode>
  </GoogleOAuthProvider>,
);
