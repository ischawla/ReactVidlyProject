import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import * as userService from "../services/userService";
import auth from "../services/authServices";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .email()
      .label("USERNAME"),
    password: Joi.string()
      .required()
      .min(5)
      .label("PWD"),
    name: Joi.string()
      .required()
      .label("Name")
  };

  doSubmit = async () => {
    //server calls start here.....
    try {
      debugger;
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      //this.props.history.push("/");
      window.location = "/";
      console.log("Submitted");
    } catch (ex) {
      //400 means client did some mistake
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data; //setting up the error message coming from server
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Registration Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "User Name")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
