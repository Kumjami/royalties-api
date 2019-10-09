require('env2')('./tests/test.env');
const request = require('supertest');

const app = require('../../src/app');

describe('Count views flow - ', () => {
  describe('Given - the system is reseted and all royalties and views are 0', () => {
    beforeAll(() => request(app).post('/royaltymanager/reset'));

    describe('When - a view is posted for a Fox studio episode', () => {
      beforeAll(() => request(app)
        .post('/royaltymanager/viewing').send({
          episode: 'c1b1eb7020b345189d05000dbb05029d',
          customer: 'customerId',
        }));

      it('Then - Fox studio views count is 1 and royalty is 17.34', async () => {
        const paymentResponse = await request(app)
          .get('/royaltymanager/payments/49924ec6ec6c4efca4aa8b0779c89406');

        expect(paymentResponse.body).toEqual({
          rightsowner: 'Fox',
          viewings: 1,
          royalty: 17.34,
        });
      });
      it('Then - the payment list shows that Fox studio views count is 1 and the rest is 0', async () => {
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
            viewings: 1,
            royalty: 17.34,
          },
        ]);
      });
    });
  });
});
