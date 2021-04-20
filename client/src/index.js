import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from "react-router-dom";
import App from './App';

import './css/style.css'
import * as serviceWorker from "./serviceWorker"

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();