import { Router } from 'express'
import { io } from '@/libs/socket'
import * as taskStore from './task-store'

const router = Router()

io.on('connection', (socket) => {
  const tasks = taskStore.allTasks()
  socket.emit('TASK_UPDATE', tasks)
})

export default router
