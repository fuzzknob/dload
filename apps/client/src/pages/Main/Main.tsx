import React, { useState } from 'react'
import { IoAddOutline, IoSettingsOutline } from 'react-icons/io5'
import { Space, Group, Box, Title, ActionIcon } from '@mantine/core'
import { useHotkeys } from '@mantine/hooks'

import MainLayout from '@/layouts/MainLayout'

import Task from './components/Task'
import AddTask from './components/AddTask'

const Main: React.FC = () => {
  const [isTaskVisible, setTaskVisible] = useState(false)

  useHotkeys([['n', () => setTaskVisible(true)]])

  return (
    <MainLayout>
      <AddTask visible={isTaskVisible} onClose={() => setTaskVisible(false)} />
      <Group position="apart">
        <ActionIcon
          size="lg"
          variant="light"
          onClick={() => setTaskVisible(true)}
        >
          <IoAddOutline size={20} />
        </ActionIcon>
        <ActionIcon size="lg" variant="light">
          <IoSettingsOutline size={20} />
        </ActionIcon>
      </Group>
      <Space h={50} />
      <Box>
        <Title order={3}>In Progress</Title>
        <Space h="md" />
        <Task type="DOWNLOAD" />
        <Task type="COPY" />
      </Box>
      <Space h={50} />
      <Box>
        <Title order={3}>In Queue</Title>
        <Space h="md" />
        <Task type="QUEUE" />
      </Box>
    </MainLayout>
  )
}

export default Main
