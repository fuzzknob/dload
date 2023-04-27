import { socket } from '@/libs/socket'
import { Task } from './task-store'
import { SOCKET_EVENTS } from '@dload/shared'

export type TaskPayload = {
  url: string
  name: string
  type: 'DOWNLOAD' | 'QUEUE'
  downloadPath: string
  directDownload: boolean
}

export const onTasksUpdate = (cb: (tasks: Task[]) => void) =>
  socket.on(SOCKET_EVENTS.TASK_UPDATE, cb)

export const addTask = (task: TaskPayload) =>
  socket.emit(SOCKET_EVENTS.ADD_TASK, task)
