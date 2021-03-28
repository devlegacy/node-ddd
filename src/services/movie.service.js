class MovieService {
  constructor({ MovieRepository }) {
    this._movieRepository = MovieRepository;
    this.collection = 'Movies';
  }

  async getMovies({ tags }) {
    const query = tags && { tags: { $in: tags } };
    const movies = await this._movieRepository.getMovies(
      this.collection,
      query
    );
    return movies || [];
  }

  async getMovie({ movieId }) {
    const movie = await this._movieRepository.getMovie(
      this.collection,
      movieId
    );
    return movie || {};
  }

  async createMovie({ movie }) {
    const movieId = await this._movieRepository.createMovie(
      this.collection,
      movie
    );
    return movieId;
  }

  async updateMovie({ movieId, movie } = {}) {
    const updatedMovieId = await this._movieRepository.updateMovie(
      this.collection,
      movieId,
      movie
    );
    return updatedMovieId;
  }

  async deleteMovie({ movieId }) {
    const movie = await this._movieRepository.deleteMovie(
      this.collection,
      movieId
    );
    return movie;
  }
}

module.exports = MovieService;
