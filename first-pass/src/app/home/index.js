import camelCaseKeys from "camelcase-keys";
import { Router } from "express";

function createHandlers({ queries }) {
  function home(req, res, next) {
    return queries
      .loadHomePage()
      .then((viewData) => res.render("home/templates/home", viewData))
      .catch(next);
  }
  return {
    home,
  };
}

function createQueries({ db }) {
  function loadHomePage() {
    return db.then((client) =>
      client("videos")
        .sum("view_count as videosWatched")
        .then((rows) => rows[0])
    );
  }
  return {
    loadHomePage,
  };
}

function createHome({ db }) {
  const queries = createQueries({ db });

  const handlers = createHandlers({ queries });
  const router = Router();

  router.route("/").get(handlers.home);

  return { handlers, queries, router };
}

export default createHome;
