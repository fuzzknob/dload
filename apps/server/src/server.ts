import express from 'express'
import http from 'node:http'

import { io } from './libs/socket'

const expressServer = express()
const httpServer = http.createServer(expressServer)

io.attach(httpServer)

expressServer.get('/', (req, res) => {
  res.send('Hello from the thing')
})

export function startServer() {
  httpServer.listen(8000, () => {
    console.log('started at http://localhost:8000')
  })
}
