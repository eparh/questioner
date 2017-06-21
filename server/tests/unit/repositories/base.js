'use strict';

const { clearCollections } = require('../../helpers/database');

module.exports = (opts) => {
  const { repository, data } = opts;

  describe('Base Repository', () => {
    describe('#create', () => {
      it('should create model', async () => {
        const { modelToCreate } = data;
        const createdModel = await repository.create(modelToCreate);

        createdModel.should.have.property('_id').which.is.an.Object();
      });
    });

    describe('#findById', () => {
      let createdModelId;

      before(async () => {
        const { modelToCreate } = data;
        const newModel = await repository.create(modelToCreate);

        createdModelId = newModel._id;
      });

      it('should find model by id', async () => {
        const model = await repository.findById(createdModelId);

        Boolean(model).should.be.eql(true);
      });
    });

    describe('#update', () => {
      let createdModelId;

      before(async () => {
        const { modelToCreate } = data;
        const newModel = await repository.create(modelToCreate);

        createdModelId = newModel._id;
      });

      it('should update model', async () => {
        const { modelToUpdate } = data;

        await repository.update({
          _id: createdModelId
        }, modelToUpdate);

        const updatedModel = await repository.findById(createdModelId);

        updatedModel.should.have.properties(modelToUpdate);
      });
    });

    describe('#find', () => {
      before(() => {
        const { modelToCreate } = data;

        return repository.create(modelToCreate);
      });

      it('should find model with attributes', async () => {
        const models = await repository.find();

        models.should.have.length(1);
      });
    });

    describe('#removeById', () => {
      let modelId;

      before(async () => {
        const { modelToCreate } = data;
        const { _id } = await repository.create(modelToCreate);

        modelId = _id;
      });

      it('should remove model by id', async () => {
        await repository.removeById(modelId);

        const models = await repository.find();

        models.should.have.length(0);
      });
    });

    afterEach(() => clearCollections([repository.Model.modelName]));
  });
};
