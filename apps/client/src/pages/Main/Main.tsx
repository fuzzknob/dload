import React, { useState } from 'react'
import { IoAddOutline, IoSettingsOutline } from 'react-icons/io5'

import MainLayout from '@/layouts/MainLayout'
import Button from '@/components/Button'
import Text from '@/components/Text'

import Task from './components/Task'
import AddTask from './components/AddTask'

const Main: React.FC = () => {
  const [isTaskVisible, setTaskVisible] = useState(true)
  return (
    <MainLayout>
      <AddTask visible={isTaskVisible} onClose={() => setTaskVisible(false)} />
      <div className="flex justify-between">
        <Button shape="square" onClick={() => setTaskVisible(true)}>
          <IoAddOutline size={20} />
        </Button>
        <Button shape="square">
          <IoSettingsOutline size={20} />
        </Button>
      </div>
      <div className="mt-10">
        <Text size="lg" weight="bold">
          In Progress
        </Text>
      </div>
      <div className="pt-5">
        <Task type="DOWNLOAD" />
        <Task type="COPY" />
      </div>
      <div className="mt-10">
        <Text size="lg" weight="bold">
          In Queue
        </Text>
      </div>
      <div className="pt-5">
        <Task type="QUEUE" />
      </div>
    </MainLayout>
  )
}

export default Main
