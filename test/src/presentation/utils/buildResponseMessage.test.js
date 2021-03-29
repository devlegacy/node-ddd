const buildResponseMessage = require('../../../../src/presentation/utils/buildResponseMessage');

describe('utils - buildResponseMessage', () => {
  describe('When receives an entity and action', () => {
    it('Should return the respective message', () => {
      const result = buildResponseMessage('movie', 'create');
      const expected = 'movie created';

      expect(result).toEqual(expected);
    });
  });

  describe('When receives an entity, an action and is a list', () => {
    it('Should return the respective message with the entity in plural', () => {
      const result = buildResponseMessage('movie', 'list');
      const expected = 'movies listed';

      expect(result).toEqual(expected);
    });
  });
});
