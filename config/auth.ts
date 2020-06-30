/**
 * Config source: https://git.io/JvyKy
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import User from 'App/Models/User'
import { AuthConfig } from '@ioc:Adonis/Addons/Auth'

/*
|--------------------------------------------------------------------------
| Authentication Mapping
|--------------------------------------------------------------------------
|
| List of available authentication mapping. You must first define them
| inside the `contracts/auth.ts` file before mentioning them here.
|
*/
const authConfig: AuthConfig = {
  guard: 'api',
  list: {
    api: {
      driver: 'oat',
      tokenProvider: {
        driver: 'database',
        table: 'api_tokens',
      },
      provider: {
        driver: 'lucid',
        model: User,
        identifierKey: 'id',
        uids: ['email'],
      },
    },
  },
}

export default authConfig
