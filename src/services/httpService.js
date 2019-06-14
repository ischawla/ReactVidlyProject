import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logService";
//import auth from "./authServices";

//axios.defaults.headers.common["x-auth-token"] = auth.getJwt();

// axios's interceptor use() two parameter: use(success , error). if you want to intercept success response then success else keep it null.
//This function will be called whenever we get an error in the response. After logging , control is passed to catch block.
axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log("logging the error:", error);
    logger.log(error);
    toast.error("Unexpected error occured...");
    //toast("Unexpected error occured..."); //this is another way of raising toast message
  }

  //Now to pass the control to the catch block we need to return rejected promise.
  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};
