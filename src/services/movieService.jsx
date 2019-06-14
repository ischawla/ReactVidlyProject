import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/movies";

function movieUrl(id) {
  //return apiEndPoint + "/" + id;
  return `${apiEndPoint}/${id}`;
}
export function getMovies() {
  return http.get(apiEndPoint);
}

export function getMovie(movieId) {
  return http.get(movieUrl(movieId));
}

export function saveMovie(movie) {
  if (movie._id) {
    //we have to delete '_id' from movie object because we already sending 'movie._id' in the URL.
    const clonnedMovie = { ...movie };
    delete clonnedMovie._id;
    return http.put(movieUrl(movie._id), movie);
  }
  return http.post(apiEndPoint, movie);
}

export function deleteMovie(movieId) {
  return http.delete(movieUrl(movieId));
}
