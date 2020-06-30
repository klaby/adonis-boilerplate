import test from 'japa'
import UserEvent from 'App/Events/User'

test.group('Events', () => {
  test('You must send the confirmation email and return "sent".', async (assert) => {
    const result = await UserEvent.sendMail('test@example.com')
    assert.equal(result, 'sent')
  })
})
