import React, { useEffect } from 'react'

import { useTaskStore } from './task-store'
import { onTasksUpdate } from './task-service'

interface TaskProviderProps {
  children: React.ReactNode
}

const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const upsertTasks = useTaskStore(({ upsertTasks }) => upsertTasks)
  useEffect(() => {
    onTasksUpdate(upsertTasks)
  }, [])

  return <>{children}</>
}

export default TaskProvider
