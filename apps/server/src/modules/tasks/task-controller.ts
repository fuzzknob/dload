import { Router } from 'express'
import { io } from '@/libs/socket'
import { SOCKET_EVENTS, API_ROUTES } from '@dload/shared'
import * as taskStore from './task-store'
import * as taskService from './task-service'

const router = Router()

io.on('connection', (socket) => {
  const tasks = taskStore.allTasks()
  socket.emit(SOCKET_EVENTS.UPDATE_TASK, Object.values(tasks))
})

router.post(API_ROUTES.ADD_TASK, async (req, res) => {
  const task = req.body as taskStore.Task
  await taskService.addTask(task)
  res.send()
})

router.post(API_ROUTES.REMOVE_TASK, async (req, res) => {
  const taskId = req.body.taskId as string
  const task = taskStore.getTask(taskId)
  await taskService.removeDownload(task)
  res.send()
})

router.post(API_ROUTES.TASK_TOGGLE_PAUSE, async (req, res) => {
  const taskId = req.body.taskId as string
  const task = taskStore.getTask(taskId)
  await taskService.togglePause(task)
  res.send()
})

export default router
