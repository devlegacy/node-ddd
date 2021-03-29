const mapper = require('automapper-js');

class BaseBusiness {
  constructor(EntityRepository, entityToMap) {
    this._entityRepository = EntityRepository;
    this._entityToMap = entityToMap;
  }

  async getAll() {
    const entities = await this._entityRepository.getAll();
    return entities.map((entity) => mapper(this._entityToMap, entity));
  }

  async getOneById(id) {
    const entity = await this._entityRepository.getOneById(id);
    return mapper(this._entityToMap, entity);
  }

  async create(entity) {
    entity = mapper(this._entityToMap, entity);
    const createdEntity = await this._entityRepository.create(entity);
    return mapper(this._entityToMap, createdEntity);
  }

  async update(id, entity) {
    entity = mapper(this._entityToMap, entity);
    const updatedEntity = await this._entityRepository.update(id, entity);
    return mapper(this._entityToMap, updatedEntity);
  }

  async delete(id) {
    return await this._entityRepository.delete(id);
  }
}
module.exports = BaseBusiness;
