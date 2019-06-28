import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import { BrowserRouter } from "react-router-dom";

//VARIABLE SHOULD ALWAYS START WITH 'REACT_APP'
//When we run the application using -
// npm start : Development Env variable will be picked from .env.devlopment
// npm run build: Production Env variable will be invoked from '.env.production'
// npm test : Test Env variable will be invoked from '.env.test'
console.log(process.env);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
