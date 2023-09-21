import create from 'zustand'
import { Task } from '@dload/shared'

export const useTaskStore = create<{
  tasks: Task[]
  upsertTasks: (tasks: Task[]) => void
}>((set) => ({
  tasks: [],
  upsertTasks: (newTasks) => set(() => ({ tasks: newTasks || [] })),
}))
