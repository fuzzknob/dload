import request from '@/libs/request'
import { socket } from '@/libs/socket'
import { Task } from './task-store'
import { SOCKET_EVENTS, API_ROUTES } from '@dload/shared'

export type TaskPayload = {
  url: string
  name: string
  type: 'DOWNLOAD' | 'QUEUE'
  downloadPath: string
  directDownload: boolean
}

export const onTasksUpdate = (cb: (tasks: Task[]) => void) =>
  socket.on(SOCKET_EVENTS.UPDATE_TASK, cb)

export const addTask = (task: TaskPayload) =>
  request.post(API_ROUTES.ADD_TASK, task)

export const removeTask = (taskId: string) =>
  request.post(API_ROUTES.REMOVE_TASK, { taskId })
