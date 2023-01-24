import create from 'zustand'

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

export const useTaskStore = create<{
  tasks: Task[]
  upsertTasks: (tasks: Task[]) => void
}>((set) => ({
  tasks: [],
  upsertTasks: (newTasks) => set(() => ({ tasks: { ...newTasks } })),
}))
