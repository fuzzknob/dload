import React from 'react'
import {
  IoPauseOutline,
  IoLinkOutline,
  IoCreateOutline,
  IoCloseOutline,
} from 'react-icons/io5'

import Button from '@/components/IconButton'

import { TaskType } from '@/modules/task'

type ActionType = 'PAUSE' | 'COPY_LINK' | 'EDIT' | 'CLOSE'

const ACTION_MAP: Record<TaskType, ActionType[]> = {
  DOWNLOAD: ['PAUSE', 'COPY_LINK', 'CLOSE'],
  COPY: ['COPY_LINK', 'CLOSE'],
  QUEUE: ['EDIT', 'COPY_LINK', 'CLOSE'],
}

const PauseAction = () => {
  return (
    <Button>
      <IoPauseOutline size={16} />
    </Button>
  )
}

const CopyLinkAction = () => {
  return (
    <Button>
      <IoLinkOutline size={20} />
    </Button>
  )
}

const EditAction = () => {
  return (
    <Button>
      <IoCreateOutline size={18} />
    </Button>
  )
}

const CloseAction = () => {
  return (
    <Button>
      <IoCloseOutline size={20} />
    </Button>
  )
}

interface TaskActionsProps {
  type: TaskType
}

const TaskActions: React.FC<TaskActionsProps> = ({ type }) => {
  const actions = ACTION_MAP[type]
  return (
    <div className="flex">
      {actions.map((action) => (
        <div className="flex pl-4" key={action}>
          {action === 'PAUSE' && <PauseAction />}
          {action === 'COPY_LINK' && <CopyLinkAction />}
          {action === 'EDIT' && <EditAction />}
          {action === 'CLOSE' && <CloseAction />}
        </div>
      ))}
    </div>
  )
}

export default TaskActions
