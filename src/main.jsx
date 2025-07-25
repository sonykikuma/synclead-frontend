import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import './index.css'
import { BrowserRouter } from "react-router-dom";
import store from "./app/store.js";
import App from "./App.jsx";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
