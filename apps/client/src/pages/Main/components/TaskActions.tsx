import React from 'react'
import { Group, ActionIcon } from '@mantine/core'
import {
  IoPauseOutline,
  IoLinkOutline,
  IoCreateOutline,
  IoCloseOutline,
} from 'react-icons/io5'

import { Task, TaskType } from '@/modules/tasks/task-store'

type ActionType = 'PAUSE' | 'COPY_LINK' | 'EDIT' | 'CLOSE'

const ACTION_MAP: Record<TaskType, ActionType[]> = {
  DOWNLOAD: ['PAUSE', 'COPY_LINK', 'CLOSE'],
  COPY: ['COPY_LINK', 'CLOSE'],
  QUEUE: ['EDIT', 'COPY_LINK', 'CLOSE'],
}

interface TaskActionsProps {
  task: Task
  copyDownloadLink: () => void
}

const TaskActions: React.FC<TaskActionsProps> = ({
  task,
  copyDownloadLink,
}) => {
  const actions = ACTION_MAP[task.type]
  return (
    <Group spacing="xs">
      {actions.map((action, index) => (
        <div key={`${action}${index}`}>
          {action === 'PAUSE' && (
            <ActionIcon>
              <IoPauseOutline size={16} />
            </ActionIcon>
          )}
          {action === 'COPY_LINK' && (
            <ActionIcon onClick={copyDownloadLink}>
              <IoLinkOutline size={18} />
            </ActionIcon>
          )}
          {action === 'EDIT' && (
            <ActionIcon>
              <IoCreateOutline size={18} />
            </ActionIcon>
          )}
          {action === 'CLOSE' && (
            <ActionIcon>
              <IoCloseOutline size={20} />
            </ActionIcon>
          )}
        </div>
      ))}
    </Group>
  )
}

export default TaskActions
