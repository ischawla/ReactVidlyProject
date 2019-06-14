import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import MovieList from "./components/ListMovieExcercise";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import Customers from "./components/customer";
import Rentals from "./components/rentals";
import NotFound from "./components/notfound";
import NavBar from "./common/navbar";
import "./App.css";
import MovieForm from "./components/movieform";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./common/logout";
import ProtectedRoute from "./common/protectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import auth from "./services/authServices";

// In Route component - it implicitly passess - 'location' , 'history' & 'match' object
// If you want to pass any extra parameter along with these 3 implicit object use "render" as a function.
// Also you have to use {...props} spread operator aloong with the extra parameter.
// <Route path="/Customer" render={(props)=><Product sortBy="newest" {...props}/>}

// To define a query parameter use ":" before the parameter. Eg: '/movies/:id'
//Passed parameter can be acccess using "match.params.id"
// "movies/:id?" :? is used to make parameter OPTIONAL.
//NOTE : Passing optional parameter in Route paremeter, instead use in QUERY STRING. queryString is a 3rd party lib dealing with querystring
// const result = queryString.parse(location.<YOUR PARAMETER NAME>);

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  // Passing 'render' to the 'route':
  // we can not use 'user={this.state.user} in side Route component.
  // to pass user object to the 'movies' object we need to use 'render' where we pass a function that takes props.
  // <ProtectedRoute path="/movies/:id" component={MovieForm} />
  /*<Route
              path="/movies/:id"
              render={props => <MovieForm {...props} user={this.state.user} />}
            />*/

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route
              path="/movies"
              render={props => <MovieList {...props} user={this.state.user} />}
            />

            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Redirect from="/" exact to="/movies" />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
