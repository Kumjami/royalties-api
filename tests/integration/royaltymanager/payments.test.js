require('env2')('tests/test.env');
const request = require('supertest');

const app = require('../../../src/app');

describe('GET /royaltymanager/payments', () => {
  it('should respond with a 200 status code and the list of studios and royalties', async () => {
    const response = await request(app)
      .get('/royaltymanager/payments');

    expect(response.status).toEqual(200);
    expect(response.body).toEqual([
      {
        rightsownerId: '665115721c6f44e49be3bd3e26606026',
        rightsowner: 'HBO',
        royalty: 0,
        viewings: 0,
      },
      {
        rightsownerId: '8d713a092ebf4844840cb90d0c4a2030',
        rightsowner: 'Sky UK',
        royalty: 0,
        viewings: 0,
      },
      {
        rightsownerId: '75aee18236484501b209aa36f95c7e0f',
        rightsowner: 'Showtime',
        royalty: 0,
        viewings: 0,
      },
      {
        rightsownerId: '49924ec6ec6c4efca4aa8b0779c89406',
        rightsowner: 'Fox',
        royalty: 0,
        viewings: 0,
      },
    ]);
  });
});
