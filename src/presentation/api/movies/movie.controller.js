const cacheResponse = require('../../utils/cacheResponse');
const {
  FIVE_MINUTES_IN_SECONDS,
  SIXTY_MINUTES_IN_SECONDS,
} = require('../../utils/time');

let _movieService = null;

class MovieController {
  constructor({ MovieService }) {
    _movieService = MovieService;
  }

  async index(req, res, next) {
    cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
    const { tags } = req.query;
    try {
      const movies = await _movieService.getMovies({ tags });
      res.status(200).json({
        data: movies,
        message: 'List of movies',
      });
    } catch (err) {
      next(err);
    }
  }

  async show(req, res, next) {
    cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
    const { movieId } = req.params;
    try {
      const movie = await _movieService.getMovie({ movieId });

      if (!movie) {
        res.status(400).json({ message: 'Movie not found' });
        return;
      }

      res.status(200).json({
        data: movie,
        message: 'Movie retrieved',
      });
    } catch (err) {
      next(err);
    }
  }

  async create(req, res, next) {
    const { body: movie } = req;
    try {
      const movieId = await _movieService.createMovie({ movie });
      res.status(201).json({
        data: movieId,
        message: 'Movie created',
      });
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    const { movieId } = req.params;
    const { body: movie } = req;
    try {
      const updatedMovieId = await _movieService.updateMovie({
        movieId,
        movie,
      });
      res.status(200).json({
        data: updatedMovieId,
        message: 'Movie updated',
      });
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    const { movieId } = req.params;
    try {
      const movie = await _movieService.deleteMovie({ movieId });
      res.status(200).json({
        data: movie,
        message: 'Movie deleted',
      });
    } catch (err) {
      next(err);
    }
  }
}
module.exports = MovieController;
