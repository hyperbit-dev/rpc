import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { Home, CreateWallet, ImportWallet } from "./pages";
import { Layout } from "./components/Layout";
import { Overview, Wallets } from "./pages/admin";

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <Layout> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin/overview" element={<Overview />} />
            <Route path="/admin/wallets" element={<Wallets />} />
            <Route path="/auth/register" element={<Home />} />
            <Route path="/auth/import" element={<Home />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("app")
  );
}

render();
