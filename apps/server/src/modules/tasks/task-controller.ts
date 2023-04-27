import { Router } from 'express'
import { io } from '@/libs/socket'
import { SOCKET_EVENTS } from '@dload/shared'
import * as taskStore from './task-store'
import * as taskService from './task-service'

const router = Router()

io.on('connection', (socket) => {
  const tasks = taskStore.allTasks()
  socket.emit(SOCKET_EVENTS.TASK_UPDATE, Object.values(tasks))
  socket.on(SOCKET_EVENTS.ADD_TASK, async (task: taskStore.Task) => {
    await taskService.addTask(task)
  })
})

export default router
