import express from 'express'
import http from 'node:http'
import cors from 'cors'

import { io } from '@/libs/socket'
import * as logger from '@/libs/logger'
import TaskRoutes from '@/modules/tasks/task-controller'
import SettingRoutes from '@/modules/settings/setting-controller'
import { errorHandler } from '@/services/error-handler'

const expressServer = express()
expressServer.use(cors())
expressServer.use(express.json())

// Routes
expressServer.use(TaskRoutes)
expressServer.use(SettingRoutes)

expressServer.use(errorHandler)

const httpServer = http.createServer(expressServer)

io.attach(httpServer)

export function startServer() {
  httpServer.listen(8000, () => {
    logger.info('started at http://localhost:8000')
  })
}
