import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import { createRoot } from "react-dom/client";
//import axios from 'axios'

import {setupStore} from "./store";
//import { fetchTodos } from './features/todos/todosSlice'
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./authConfig";
//store.dispatch(fetchTodos())

const msalInstance = new PublicClientApplication(msalConfig);

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript

const preloadedState = {}

root.render(
  <Provider store={(setupStore(preloadedState))}>
    <MsalProvider instance={msalInstance}>
      <App />
    </MsalProvider>
  </Provider>
);
