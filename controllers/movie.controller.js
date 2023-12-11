const { models, Sequelize } = require("../config/sequelize-config");
const config = require("../config/config");
const ratings = require("../models/ratings");

const addMovieController = async (req, res, next) => {
  try {
    const searchMovie = await models.movies.findAll({
      attributes: ["movie_name"],
      where: { movie_name: req.body.movie_name },
    });
    if (searchMovie.length == 0) {
      const movieCreate = await models.movies.create({
        movie_name: req.body.movie_name,
        release_year: req.body.release_year,
        movie_desc: req.body.movie_desc,
        user_id: req.decoded.user_id,
      });
      res.json({
        movieCreate,
      });
    } else {
      return next({
        status: 400,
        message: "movie already exits",
      });
    }
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};
const getAllMovieController = async (req, res, next) => {
  try {
    const getMovies = await models.movies.findAll({
      include: [
        {
          model: models.ratings,
          as: "ratings",
          where: { movie_id: Sequelize.col("movies.movie_id") },
        },
      ],
      logging: true,
    });

    res.json({
      getMovies,
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};
const getMovieController = async (req, res, next) => {
  try {
    const getMovie = await models.movies.findAll({});

    res.json({
      getMovie,
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};
module.exports = {
  addMovieController,
  getAllMovieController,
};