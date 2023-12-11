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
      attributes: ["movie_name"],
      include: [
        {
          model: models.ratings,
          as: "ratings",
          attributes: ["rating"],
          include: [
            {
              model: models.users,
              as: "userRating",
              attributes: ["user_name"],
            },
          ],
        },
        {
          model: models.users,
          as: "addedBy",
          attributes: ["user_name"],
        },
      ],
    });

    // const moviesWithFormattedData = getMovies.map((movie) => {
    //   const ratings = movie.ratings.map((rating) => ({
    //     rating: rating.rating,
    //     ratedBy: rating.userRating.user_name,
    //   }));

    //   const overallRating = movie.ratings.length
    //     ? movie.ratings.reduce((total, rating) => total + rating.rating, 0) /
    //       movie.ratings.length
    //     : 0;

    //   return {
    //     movieName: movie.movie_name,
    //     addedBy: movie.addedBy.user_name,
    //     ratings,
    //     overallRating,
    //   };
    // });

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
