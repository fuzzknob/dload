import { WebSocket as Aria2WebSocket } from 'libaria2-ts'

const aria2 = new Aria2WebSocket.Client({
  host: 'localhost',
  port: 6800,
  path: '/jsonrpc',
})

export * from 'libaria2-ts'

export default aria2
