import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Form from "../common/form";
import auth from "../services/authServices";

//Inside <label> component we used class 'htmlFor' because 'For' is a reserved word in javascript
//(it is as same as what we are using className instead of class)
//In react application we should never work with 'document' object. Instead we should
class LoginForm extends Form {
  state = {
    data: { username: "", password: "" }, // here username:null can not be set to null (or undefined) else Warning will be thrown.
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("USERNAME"),
    password: Joi.string()
      .required()
      .label("PWD")
  };

  username = React.createRef();

  /* Below validation is without Joi
 validate = () => {
    const errors = {};
    const { data } = this.state;
    if (data.username.trim() === "") errors.username = "Username required";
    if (data.password.trim() === "") errors.password = "Password required";
    return Object.keys.length === 0 ? null : errors;
  };
  validateInput = input => {
    if (input.name === "username") {
      if (input.value.trim() === "") return "Username required";
    }

    if (input.name === "password") {
      if (input.value.trim() === "") return "Password required";
    }
  };
  */

  doSubmit = async () => {
    //server calls start here.....
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);

      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      console.log("catch calling..." + ex);
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "User Name")}
          {this.renderInput("password", "Password", "password")}

          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
