require('env2')('tests/test.env');
const request = require('supertest');

const app = require('../../../src/app');

describe('GET /royaltymanager/payments/:studioId', () => {
  it('should respond with a 200 status code and the royalties for the studio', async () => {
    const response = await request(app)
      .get('/royaltymanager/payments/49924ec6ec6c4efca4aa8b0779c89406');

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      rightsowner: 'Fox',
      royalty: 0,
      viewings: 0,
    });
  });
  it('should respond with a 404 status code if the studio does not exist', async () => {
    const response = await request(app)
      .get('/royaltymanager/payments/inventedStudio');

    expect(response.status).toEqual(404);
    expect(response.body).toEqual({
      error: 'The studio does not exist',
    });
  });
});
