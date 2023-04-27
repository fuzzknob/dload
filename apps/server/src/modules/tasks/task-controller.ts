import { Router } from 'express'
import { io } from '@/libs/socket'
import { SOCKET_EVENTS } from '@dload/shared'
import * as taskStore from './task-store'
import * as taskService from './task-service'

const router = Router()

io.on('connection', (socket) => {
  const tasks = taskStore.allTasks()
  socket.emit(SOCKET_EVENTS.UPDATE_TASK, Object.values(tasks))
})

router.post('/add-task', async (req, res) => {
  const task = req.body as taskStore.Task
  await taskService.addTask(task)
  res.send('Success')
})

export default router
