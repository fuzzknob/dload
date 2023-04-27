import { Server } from 'socket.io'

export const io = new Server({
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
})

export * from 'socket.io'
