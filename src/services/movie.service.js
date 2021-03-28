const { moviesMock } = require('../presentation/api/movies/utils/mocks/movies');
class MovieService {
  async getMovies() {
    const movies = await Promise.resolve(moviesMock);
    return movies || [];
  }

  async getMovie() {
    const movie = await Promise.resolve(moviesMock[0]);
    return movie || {};
  }

  async createMovie() {
    const movie = await Promise.resolve(moviesMock[0].id);
    return movie;
  }

  async updateMovie() {
    const movie = await Promise.resolve(moviesMock[0].id);
    return movie;
  }

  async deleteMovie() {
    const movie = await Promise.resolve(moviesMock[0].id);
    return movie;
  }
}

module.exports = MovieService;
