import Store from '@/libs/store'
import db from '@/services/database'
import { Task } from '@dload/shared'

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
    return tasks
  })
}

export function deleteTask(taskId: string) {
  store.safeSet((tasks) => {
    delete tasks[taskId]
  })
}
