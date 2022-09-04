import React, { useState } from 'react'
import { IoArrowDownOutline } from 'react-icons/io5'

import { TaskType } from '@/modules/task'

import Container from '@/components/Container'
import Text from '@/components/Text'

import Actions from './TaskActions'
import ProgressBar from '@/components/ProgressBar'

interface TaskProps {
  type: TaskType
}

const Task: React.FC<TaskProps> = ({ type }) => {
  const [progress, setProgress] = useState(0)

  return (
    <Container
      className="py-4 px-6 mb-4 flex flex-col justify-center"
      color="secondary"
      rounded
    >
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <Text size="sm">ubuntu desktop.iso</Text>
          {type === 'QUEUE' && (
            <Text size="xs" color="tertiary" italic>
              https://codeload.github.com/vuejs/vue/tar.gz/refs/tags/v2
            </Text>
          )}
        </div>
        <Actions type={type} />
      </div>
      {['COPY', 'DOWNLOAD'].includes(type) && (
        <div className="mt-1">
          <Text size="xs" weight="thin" italic>
            {type === 'COPY' ? 'Copying...' : 'Downloading...'}
          </Text>
          <ProgressBar progress={progress} />
          <div className="flex justify-between mt-3">
            <Text size="xs" weight="light">
              1.2GB / 3.0GB
            </Text>
            <div className="flex">
              <Text
                className="flex items-center"
                italic
                size="xs"
                weight="light"
              >
                <IoArrowDownOutline className="text" />
                8.7 MB/s
              </Text>
              <Text className="ml-4" size="xs" weight="light">
                Remaining 3m 56s
              </Text>
            </div>
          </div>
        </div>
      )}
    </Container>
  )
}

export default Task
