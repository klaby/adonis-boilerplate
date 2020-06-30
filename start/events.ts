import Event from '@ioc:Adonis/Core/Event'

import UserEvent from 'App/Events/User'

/*
|--------------------------------------------------------------------------
| Register Events
|--------------------------------------------------------------------------
|
| Register all events below.
|
*/
Event.on('user:send_mail', UserEvent.sendMail)
