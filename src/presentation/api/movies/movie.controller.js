let _movieService = null;

class MovieController {
  constructor({ MovieService }) {
    _movieService = MovieService;
  }
  async index(req, res, next) {
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
    const { movieId } = req.params;
    try {
      const movie = await _movieService.getMovie({ movieId });
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
