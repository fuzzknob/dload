import Store from '@/libs/store'
import db from '@/services/database'

export type TaskType = 'DOWNLOAD' | 'COPY' | 'QUEUE'

export interface Task {
  id: string
  name: string
  fileExtension: string
  status: 'STALLED' | 'IN_PROGRESS' | 'PAUSED' | 'COMPLETED' | 'ERROR'
  url: string
  downloadPath: string
  type: TaskType
  progress: number
  directDownload: boolean
  gid?: string
  remainingTime?: string
  downloadSpeed?: string
  downloaded?: string
  totalSize?: string
}

const store = new Store<Record<string, Task>>({
  name: 'tasks',
  database: db,
})

export function allTasks() {
  return store.get() || {}
}

export function getTask(id: string) {
  return store.get()?.[id]
}

export function getTaskByGID(gid: string) {
  const tasks = allTasks()
  return Object.values(tasks).find((task) => task.gid === gid)
}

export function upsertTask(task: Task) {
  store.safeSet((tasks) => {
    if (!tasks) tasks = {}
    tasks[task.id] = task
  })
}

export function deleteTask(taskId: string) {
  store.safeSet((tasks) => {
    delete tasks[taskId]
  })
}
