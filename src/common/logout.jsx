import React, { Component } from "react";
//import { logout } from "../services/authServices"; //this is a way of importing a function
import auth from "../services/authServices"; // there we are importing the default object using reference as 'auth'
class Logout extends Component {
  componentDidMount() {
    auth.logout();
    window.location = "/";
  }
  render() {
    return null;
  }
}

export default Logout;
