import test from 'japa'
import { request, token } from '../setup'

test.group('/USERS', () => {
  test('GET /users -> Must return an array of users.', async (assert) => {
    const { body } = await request
      .get('/users')
      .auth(token, { type: 'bearer' })
      .expect(200)

    assert.isArray(body)
  })
})
