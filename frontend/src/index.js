import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from './ErrorBoundary';
import { AuthProvider } from './context/AuthContext';

ReactDOM.render(
  <ErrorBoundary>
    <React.StrictMode>
      <AuthProvider> 
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </React.StrictMode>
  </ErrorBoundary>, 
  document.getElementById("root")
);
