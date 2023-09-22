import 'dotenv-flow/config'
import db from '@/services/database'
import { initialize as initializeWaiting } from '@/libs/waitToInitialize'
import * as logger from '@/libs/logger'
import { startServer } from './server'
import { logErrorAndRethrow } from './libs/utils'

async function main() {
  await db.init()
  await initializeWaiting()
  startServer()
}

main()
  .then(() => logger.info('App Initialized'))
  .catch((e) => logErrorAndRethrow(e))
