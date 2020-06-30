import 'reflect-metadata'

import dotenv from 'dotenv'
import japa from 'japa'
import getPort from 'get-port'
import sourceMapSupport from 'source-map-support'

dotenv.config({ path: '.env.testing' })

process.env.ADONIS_ACE_CWD = process.cwd()
sourceMapSupport.install({ handleUncaughtExceptions: false })

const startServer = async () => {
  const { Ignitor } = await import('@adonisjs/core/build/src/Ignitor')
  process.env.PORT = String(await getPort())
  await new Ignitor(__dirname).httpServer().start()
}

japa.configure({
  files: ['build/test/**/*.spec.js'],
  before: [startServer],
})
