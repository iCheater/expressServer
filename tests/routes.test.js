const app = require('../app')
const supertest = require('supertest')
const request = supertest(app)

describe('Auth endpoints', () => {
  // it('should login', async () => {
  //   const res = await request.post('/login')
  //     .send({
  //       username: 'test',
  //       password: 'test',
  //     })
  //     .set('Accept', 'application/json')
  //
  //   console.log(res)
  //   expect(res.statusCode).toEqual(200)
  //   // expect(res.body).toHaveProperty('post')
  // })
  // it('should login', async () => {
  //   const res = await request.get('/catalog')
  //   expect(res.statusCode).toEqual(200)
  //   // expect(res.body).toHaveProperty('post')
  // })
  it('responds with json', async () => {
    const res = await request
      .post('/login')
      .send({
        username: 'test',
        password: 'test',
      })
      // .send('username=test')
      // .auth('test', 'test')
      // .set('Accept', 'application/json')
      // .expect('Content-Type', /json/)
      .expect(200)
  })
})
