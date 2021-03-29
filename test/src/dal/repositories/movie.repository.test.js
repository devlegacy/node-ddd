const MovieRepository = require('../../../../src/dal/repositories/movie.repository');
const {
  moviesMock,
  filteredMoviesMock,
} = require('../../../../src/presentation/api/movies/utils/mocks/movies');
const tagQuery = { tags: { $in: ['Drama'] } };

jest.mock('../../../../src/dal/repositories/movie.repository');

describe('Repository - Movies', () => {
  let movieRepository;
  beforeAll(() => {
    MovieRepository.mockImplementation(() => {
      return {
        getMovies: async (collection = 'movies', query = {}) =>
          Object.entries(query).length === 0
            ? moviesMock
            : filteredMoviesMock('Drama'),
        createMovie: async (collection = 'movies', data = {}) =>
          moviesMock[0].id,
      };
    });
    movieRepository = new MovieRepository({ db: {} });
  });

  describe('When getMovies method is called', () => {
    it('should call the getMovies from repository', async () => {
      movieRepository = new MovieRepository({ db: {} });
      const movies = await movieRepository.getMovies();

      expect(MovieRepository).toHaveBeenCalledTimes(1);
    });

    it('should return an array of movies', async () => {
      const result = await movieRepository.getMovies('movies', {});
      const expected = moviesMock;
      expect(result).toEqual(expected);
    });

    it('should return an array of movies', async () => {
      const result = await movieRepository.getMovies('movies', tagQuery);
      const expected = filteredMoviesMock('Drama');

      expect(result).toEqual(expected);
    });
  });
});
