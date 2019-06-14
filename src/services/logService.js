//import Raven from "raven-js";

function init() {
  /*Raven.config("https://c38af49a88c24546bed6715575c332bf@sentry.io/1441428", {
    release: "1-0-0",
    environment: "development-test"
  }).install();*/
}

function log(error) {
  //Raven.captureException(error);
  console.error(error);
}

export default {
  init,
  log
};
