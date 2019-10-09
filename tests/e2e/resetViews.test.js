require('env2')('./tests/test.env');
const request = require('supertest');

const app = require('../../src/app');

beforeAll(async () => request(app).post('/royaltymanager/reset'));

describe('Reset views flow - ', () => {
  describe('Given - there is a view posted for an episode from a Fox studio', () => {
    beforeAll(async () => request(app)
      .post('/royaltymanager/viewing').send({
        episode: 'c1b1eb7020b345189d05000dbb05029d',
        customer: 'customerId',
      }));

    describe('When - reseting the views count', () => {
      beforeAll(async () => request(app).post('/royaltymanager/reset'));

      it('Then - Fox studio views counter and royalty is 0', async () => {
        const paymentResponse = await request(app)
          .get('/royaltymanager/payments/49924ec6ec6c4efca4aa8b0779c89406');

        expect(paymentResponse.body).toEqual({
          rightsowner: 'Fox',
          viewings: 0,
          royalty: 0,
        });
      });
      it('Then - the payments list shows that views counters and royalties are 0 for all the studios', async () => {
        const paymentResponse = await request(app)
          .get('/royaltymanager/payments');

        expect(paymentResponse.body).toEqual([
          {
            rightsownerId: '665115721c6f44e49be3bd3e26606026',
            rightsowner: 'HBO',
            viewings: 0,
            royalty: 0,
          },
          {
            rightsownerId: '8d713a092ebf4844840cb90d0c4a2030',
            rightsowner: 'Sky UK',
            viewings: 0,
            royalty: 0,
          },
          {
            rightsownerId: '75aee18236484501b209aa36f95c7e0f',
            rightsowner: 'Showtime',
            viewings: 0,
            royalty: 0,
          },
          {
            rightsownerId: '49924ec6ec6c4efca4aa8b0779c89406',
            rightsowner: 'Fox',
            viewings: 0,
            royalty: 0,
          },
        ]);
      });
    });
  });
});
