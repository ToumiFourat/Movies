import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Assure-toi d'importer Tailwind CSS
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "./context/ThemeProvider";
import NotificationProvider from "./context/NotificationProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <NotificationProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </NotificationProvider>
  </BrowserRouter>
);
