'use strict';

const routes = require('./data/routes.json');
const hooks = require('../helpers/hooks/integration');
const expect = require('chai').expect;
const login = require('../helpers/hooks/login');
const initQueryConstructor = require('../helpers/utils/queryConstructor');
const { errorAuthTest, errorNotAdminTest } = require('../helpers/testTemplates');
const { success, conflict, emptyResponse } = require('../../constants').STATUS_CODES;

const { tagRepository, userService } = require('../../helpers/iocContainer').getAllDependencies();
const { clearCollections } = require('../helpers/database');

const testData = require('./data/tag');
const { testUser, testAdmin } = require('./data/user');

function clean() {
  return clearCollections([tagRepository.Model.modelName]);
}

describe('Tag API Test', () => {
  let app;
  let adminCookies;
  let queryConstructor;
  let userDataTemplate;

  before(async () => {
    app = await hooks.before();
    queryConstructor = initQueryConstructor(app);
    await Promise.all([
      userService.register(testAdmin),
      userService.register(testUser)
    ]);
    adminCookies = await login(testAdmin);
    const userCookies = await login(testUser);

    userDataTemplate = {
      queryConstructor,
      headers: {
        cookie: userCookies
      }
    };
  });

  describe('[GET] /tags/', () => {
    const { tagsToCreate } = testData;
    const errorAuthData = {
      method: 'get',
      text: 'should not get tags because not authorized',
      url: `${routes.tags.url}`
    };

    before(async () => {
      const promises = tagsToCreate.map(tag => tagRepository.create(tag));

      errorAuthData.queryConstructor = queryConstructor;
      await Promise.all(promises);
    });

    errorAuthTest(errorAuthData);

    it('should get tags', async () => {
      const response = await queryConstructor.sendRequest({
        method: 'get',
        url: `${routes.tags.url}`,
        expect: success,
        headers: {
          cookie: adminCookies
        }
      });

      expect(response.body.length).to.equal(tagsToCreate.length);
    });

    after(clean);
  });

  describe('[POST] /tags/', () => {
    const { tagToCreate } = testData;
    const errorAuthData = {
      method: 'post',
      text: 'should not create tag because not authorized',
      url: `${routes.tags.url}`
    };
    const errorNotAdminData = {
      method: 'post',
      text: 'should not create tag because of not admin',
      url: `${routes.tags.url}`
    };

    before(() => {
      errorAuthData.queryConstructor = queryConstructor;
      Object.assign(errorNotAdminData, userDataTemplate);
    });

    errorAuthTest(errorAuthData);

    errorNotAdminTest(errorNotAdminData);

    it('should create tag', async () => {
      const response = await queryConstructor.sendRequest({
        method: 'post',
        url: `${routes.tags.url}`,
        expect: success,
        body: tagToCreate,
        headers: {
          cookie: adminCookies
        }
      });

      expect(response.body.name).to.equal(tagToCreate.name);
    });

    after(clean);
  });

  describe('[PUT] /tags/', () => {
    const { tagToCreate, fakeId } = testData;
    const errorAuthData = {
      method: 'put',
      text: 'should not update tag because not authorized',
      url: `${routes.tags.url}`
    };
    const errorNotAdminData = {
      method: 'put',
      text: 'should not update tag because of not admin',
      url: `${routes.tags.url}`
    };

    let resultTag;

    before(async () => {
      resultTag = await tagRepository.create(tagToCreate);
      tagToCreate._id = resultTag._id;

      errorAuthData.queryConstructor = queryConstructor;
      Object.assign(errorNotAdminData, userDataTemplate);
    });

    errorAuthTest(errorAuthData);

    errorNotAdminTest(errorNotAdminData);

    it('should update tag', async () => {
      tagToCreate.name = 'well-well';
      const response = await queryConstructor.sendRequest({
        method: 'put',
        url: `${routes.tags.url}`,
        expect: success,
        body: tagToCreate,
        headers: {
          cookie: adminCookies
        }
      });

      expect(response.body.name).to.equal(tagToCreate.name);
    });

    it('shouldn\'t update because tag doesn\'t exist', async () => {
      await queryConstructor.sendRequest({
        method: 'put',
        url: `${routes.tags.url}`,
        expect: conflict,
        body: Object.assign({}, tagToCreate, {
          _id: fakeId
        }),
        headers: {
          cookie: adminCookies
        }
      });
    });

    after(clean);
  });

  describe('[DELETE] /tags/:id', () => {
    const { fakeId, tagToCreate } = testData;
    const errorAuthData = {
      method: 'delete',
      text: 'should not delete question because not authorized',
      url: `${routes.tags.url}/${fakeId}`
    };
    const errorNotAdminData = {
      method: 'delete',
      text: 'should not delete tag because of not admin'
    };

    beforeEach(async () => {
      const { _id } = await tagRepository.create(tagToCreate);

      errorAuthData.queryConstructor = queryConstructor;
      Object.assign(
        errorNotAdminData,
        userDataTemplate,
        {
          url: `${routes.tags.url}/${tagToCreate._id}`
        });

      tagToCreate._id = _id;
    });

    errorAuthTest(errorAuthData);

    errorNotAdminTest(errorNotAdminData);

    it('should delete tag', async () => {
      await queryConstructor.sendRequest({
        method: 'delete',
        url: `${routes.tags.url}/${tagToCreate._id}`,
        expect: emptyResponse,
        headers: {
          cookie: adminCookies
        }
      });
    });

    it('shouldn\'t delete because tag doesn\'t exist', async () => {
      await queryConstructor.sendRequest({
        method: 'delete',
        url: `${routes.tags.url}/${fakeId}`,
        expect: conflict,
        headers: {
          cookie: adminCookies
        }
      });
    });

    afterEach(clean);
  });

  after(hooks.after);
});