import express from 'express'
import http from 'node:http'
import cors from 'cors'

import { io } from './libs/socket'

import TaskRoutes from './modules/tasks/task-controller'
import { errorHandler } from './services/error-handler'

const expressServer = express()
expressServer.use(cors())
expressServer.use(express.json())

// Routes
expressServer.use(TaskRoutes)

expressServer.use(errorHandler)

const httpServer = http.createServer(expressServer)

io.attach(httpServer)

export function startServer() {
  httpServer.listen(8000, () => {
    console.log('started at http://localhost:8000')
  })
}
