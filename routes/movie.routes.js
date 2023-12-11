const express = require("express");
const { validate } = require("../middlewares/validate.middleware");

const { isAuthorised } = require("../middlewares/authorisation.middleware");
const { addMovieSchema } = require("../validations/movie.schema");
const {
  addMovieController,
  getAllMovieController,
} = require("../controllers/movie.controller");
const { addRatingSchema } = require("../validations/rating.schema");
const { addRatingController } = require("../controllers/rating.controller");

const movieRouter = express.Router();

movieRouter.post(
  "/movies",
  isAuthorised,
  validate(addMovieSchema),
  addMovieController
);
movieRouter.get("/movies", getAllMovieController);
movieRouter.post(
  "/movie/rating",
  isAuthorised,
  validate(addRatingSchema),
  addRatingController
);

module.exports = movieRouter;
