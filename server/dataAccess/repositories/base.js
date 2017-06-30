'use strict';

class BaseRepository {
  constructor(dbContext, modelName) {
    this.dbContext = dbContext;
    this.Model = dbContext.models[modelName];
  }

  async create(info) {
    const self = this;
    const newModel = await self.Model.create(info);

    return self.toJSON(newModel);
  }

  update(query, info, opts) {
    return this.Model.update(query, info, opts);
  }

  updateById(info) {
    return this.update({
      _id: info._id
    }, {
      $set: info
    });
  }

  async find(query, attributes) {
    const self = this;
    const models = await this.Model.find(query, attributes);

    return self.toJSON(models);
  }

  async findOne(query, attributes) {
    const self = this;
    const models = await this.Model.findOne(query, attributes);

    return self.toJSON(models);
  }

  async findById(id) {
    const self = this;
    const model = await this.Model.findById(id);

    return self.toJSON(model);
  }

  removeById(id) {
    return this.Model.remove({
      _id: id
    });
  }

  toJSON(info) {
    function _toJson(info) {
      return info.toJSON();
    }

    /* istanbul ignore else */
    if (Array.isArray(info)) {
      return info.map(_toJson);
    } else if (info) {
      return _toJson(info);
    } else {
      return null;
    }
  }

  toObjectId(str) {
    const converter = this.dbContext.convertToObjectId();

    return converter(str);
  }
}

module.exports = BaseRepository;