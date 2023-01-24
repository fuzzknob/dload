import { socket } from '@/libs/socket'
import { Task } from './task-store'

export const onTasksUpdate = (cb: (tasks: Task[]) => void) =>
  socket.on('TASK_UPDATE', cb)
