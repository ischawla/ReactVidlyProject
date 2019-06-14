import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import { genres } from "./../services/fakeGenreService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    errors: {},
    genres: []
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .required.min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required.min(0)
      .max(100)
      .label("Daily rental rate")
  };

  componentDidMount() {
    const genre = getGenres();
    this.setState({ genre });
  }

  doSubmit = () => {
    //server calls start here.....
    console.log("Submitted");
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

export default MovieForm;
