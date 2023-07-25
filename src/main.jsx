import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

import AuthProvider from "./context/AuthContext.jsx";
import { ModelProvider } from "./context/ModelContext.jsx";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

ReactDOM.createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ModelProvider>
          <App />
        </ModelProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
