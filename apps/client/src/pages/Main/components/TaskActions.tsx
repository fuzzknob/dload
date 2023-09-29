import React from 'react'
import { Group, ActionIcon } from '@mantine/core'
import {
  IoPauseOutline,
  IoLinkOutline,
  IoCloseOutline,
  IoPlayOutline,
} from 'react-icons/io5'
import { Task, TaskType } from '@dload/shared'

type ActionType = 'PAUSE' | 'COPY_LINK' | 'REMOVE'

const ACTION_MAP: Record<TaskType, ActionType[]> = {
  DOWNLOAD: ['PAUSE', 'COPY_LINK', 'REMOVE'],
  COPY: ['COPY_LINK', 'REMOVE'],
  QUEUE: ['COPY_LINK', 'REMOVE'],
}

interface TaskActionsProps {
  task: Task
  togglePause: () => void
  removeTask: () => void
  copyDownloadLink: () => void
}

const TaskActions: React.FC<TaskActionsProps> = ({
  task,
  togglePause,
  removeTask,
  copyDownloadLink,
}) => {
  const actions = ACTION_MAP[task.type]
  return (
    <Group gap="xs">
      {actions.map((action, index) => (
        <div key={`${action}${index}`}>
          {action === 'PAUSE' && (
            <ActionIcon variant="subtle" onClick={togglePause}>
              {task.status === 'PAUSED' ? (
                <IoPlayOutline size={16} />
              ) : (
                <IoPauseOutline size={16} />
              )}
            </ActionIcon>
          )}
          {action === 'COPY_LINK' && (
            <ActionIcon variant="subtle" onClick={copyDownloadLink}>
              <IoLinkOutline size={18} />
            </ActionIcon>
          )}
          {action === 'REMOVE' && (
            <ActionIcon variant="subtle" onClick={removeTask}>
              <IoCloseOutline size={20} />
            </ActionIcon>
          )}
        </div>
      ))}
    </Group>
  )
}

export default TaskActions
