import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import MainLayout from "./layout/MainLayout";
import Router from "./routes/Router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MainLayout>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </MainLayout>
  </React.StrictMode>
);
