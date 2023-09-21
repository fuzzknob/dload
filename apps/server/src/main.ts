import 'dotenv-flow/config'
import db from '@/services/database'
import { initialize as initializeWaiting } from './libs/waitToInitialize'
import { startServer } from './server'

async function main() {
  await db.init()
  await initializeWaiting()
  startServer()
}

main()
  .then(() => console.log('App Initialized'))
  .catch((e) => console.error(e))
