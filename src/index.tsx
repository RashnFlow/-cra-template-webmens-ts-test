import { ResetStyles } from "@webmens-ru/ui_lib";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./app/store";
import { GlobalStyles } from "./assets/globalStyle";


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ResetStyles />
      <GlobalStyles />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);
