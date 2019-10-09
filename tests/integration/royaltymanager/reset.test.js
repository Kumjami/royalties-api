require('env2')('tests/test.env');
const request = require('supertest');

const app = require('../../../src/app');

describe('POST /royaltymanager/reset', () => {
  it('should respond with a 202 status code and empty body', async () => {
    const response = await request(app)
      .post('/royaltymanager/reset')
      .send();

    expect(response.status).toEqual(202);
    expect(response.body).toEqual({});
  });
});
