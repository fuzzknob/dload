import React, { useState } from 'react'
import { IoAddOutline, IoSettingsOutline } from 'react-icons/io5'
import { Space, Group, Box, Title, ActionIcon } from '@mantine/core'
import { useHotkeys } from '@mantine/hooks'

import MainLayout from '@/layouts/MainLayout'
import { useTaskStore } from '@/modules/tasks/task-store'

import Task from './components/Task'
import AddTask from './components/AddTask'

const Main: React.FC = () => {
  const [isTaskVisible, setTaskVisible] = useState(false)
  const tasks = useTaskStore((state) => state.tasks)
  const activeTasks = tasks.filter((task) =>
    ['DOWNLOAD', 'COPY'].includes(task.type),
  )
  const queuedTasks = tasks.filter((task) => task.type === 'QUEUE')

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
        {activeTasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </Box>
      <Space h={50} />
      <Box>
        <Title order={3}>In Queue</Title>
        <Space h="md" />
        {queuedTasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </Box>
    </MainLayout>
  )
}

export default Main
