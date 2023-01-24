import React from 'react'
import { Group, ActionIcon } from '@mantine/core'
import {
  IoPauseOutline,
  IoLinkOutline,
  IoCreateOutline,
  IoCloseOutline,
} from 'react-icons/io5'

import { TaskType } from '@/modules/tasks/task-store'

type ActionType = 'PAUSE' | 'COPY_LINK' | 'EDIT' | 'CLOSE'

const ACTION_MAP: Record<TaskType, ActionType[]> = {
  DOWNLOAD: ['PAUSE', 'COPY_LINK', 'CLOSE'],
  COPY: ['COPY_LINK', 'CLOSE'],
  QUEUE: ['EDIT', 'COPY_LINK', 'CLOSE'],
}

const PauseAction = () => {
  return (
    <ActionIcon>
      <IoPauseOutline size={16} />
    </ActionIcon>
  )
}

const CopyLinkAction = () => {
  return (
    <ActionIcon>
      <IoLinkOutline size={18} />
    </ActionIcon>
  )
}

const EditAction = () => {
  return (
    <ActionIcon>
      <IoCreateOutline size={18} />
    </ActionIcon>
  )
}

const CloseAction = () => {
  return (
    <ActionIcon>
      <IoCloseOutline size={20} />
    </ActionIcon>
  )
}

interface TaskActionsProps {
  type: TaskType
}

const TaskActions: React.FC<TaskActionsProps> = ({ type }) => {
  const actions = ACTION_MAP[type]
  return (
    <Group spacing="xs">
      {actions.map((action, index) => (
        <div key={`${action}${index}`}>
          {action === 'PAUSE' && <PauseAction />}
          {action === 'COPY_LINK' && <CopyLinkAction />}
          {action === 'EDIT' && <EditAction />}
          {action === 'CLOSE' && <CloseAction />}
        </div>
      ))}
    </Group>
  )
}

export default TaskActions
