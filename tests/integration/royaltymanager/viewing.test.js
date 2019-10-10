require('env2')('tests/test.env');
const request = require('supertest');

const app = require('../../../src/app');

describe('POST /royaltymanager/viewing', () => {
  it('should respond with a 202 status code and empty body', async () => {
    const response = await request(app)
      .post('/royaltymanager/viewing')
      .send({
        episode: 'c1b1eb7020b345189d05000dbb05029d',
        customer: 'customerID',
      });

    expect(response.status).toEqual(202);
    expect(response.body).toEqual({});
  });
  it('should respond with a 400 validation error if episode is not provided', async () => {
    const response = await request(app)
      .post('/royaltymanager/viewing')
      .send({
        customer: 'customerID',
      });

    expect(response.status).toEqual(400);
    expect(response.body).toEqual({ error: '"episode" is required' });
  });
  it('should respond with a 400 validation error if customer is not provided', async () => {
    const response = await request(app)
      .post('/royaltymanager/viewing')
      .send({
        episode: 'c1b1eb7020b345189d05000dbb05029d',
      });

    expect(response.status).toEqual(400);
    expect(response.body).toEqual({ error: '"customer" is required' });
  });
  it('should respond with a 400 if episode does not exist', async () => {
    const response = await request(app)
      .post('/royaltymanager/viewing')
      .send({
        episode: 'inventedEpisode',
        customer: 'customerID',
      });

    expect(response.status).toEqual(400);
    expect(response.body).toEqual({ error: 'The episode does not exist' });
  });
});
