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
