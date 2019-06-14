import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "../services/movieService";
//import { getMovie, saveMovie } from "../services/fakeMovieService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    genres: [],
    errors: {}
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
      .min(0)
      .required()
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .min(0)
      .required()
      .max(10)
      .label("Daily Rental rate")
  };

  async populateGenre() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovies() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;
      const { data: movie } = getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateGenre();
    await this.populateMovies();
  }

  mapToViewModel = movie => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  };

  doSubmit = async () => {
    //server calls start here.....
    await saveMovie(this.state.data);
    console.log("Submitted");
    this.props.history.push("/movies");
  };

  render() {
    const user = this.props;
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("dailyRentalRate", "Daily Rental Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
