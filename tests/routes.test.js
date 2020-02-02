const app = require('../app')
const supertest = require('supertest')
const request = supertest(app)

describe('Public endpoints', () => {
  it('Homepage', async () => {
    await request
      .get('/')
      .expect(200)
  })
  it('Catalog', async () => {
    await request
      .get('/catalog')
      .expect(200)
  })
  it('Catalog', async () => {
    await request
      .get('/catalog')
      .expect(200)
  })
})
describe('Auth endpoints', () => {
  it('Correct login', async () => {
    await request
      .post('/login')
      .send({
        username: 'test',
        password: 'test',
      })
      .expect(200)
  })
  it('Incorrect login', async () => {
    await request
      .post('/login')
      .send({
        username: 'test',
        password: 'test2',
      })
      .expect(400)
  })
})
