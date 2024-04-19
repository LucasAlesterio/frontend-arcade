import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import MainLayout from "./layout/MainLayout";
import Router from "./routes/Router";
import { defaultValues, useCaseContext } from "./context";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <useCaseContext.Provider value={defaultValues}>
      <MainLayout>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </MainLayout>
    </useCaseContext.Provider>
  </React.StrictMode>
);
