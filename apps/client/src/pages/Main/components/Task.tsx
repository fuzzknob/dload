import React from 'react'
import { IoArrowDownOutline } from 'react-icons/io5'
import { Box, Space, Text, Progress, Group } from '@mantine/core'

import { Task } from '@/modules/tasks/task-store'

import Actions from './TaskActions'

interface TaskProps {
  task: Task
}

const TaskComponent: React.FC<TaskProps> = ({ task }) => {
  const { type } = task
  return (
    <Box
      sx={(theme) => ({
        padding: '15px 20px',
        marginBottom: '15px',
        borderRadius: '10px',
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[5]
            : theme.colors.gray[1],
      })}
    >
      <Group position="apart" align="center">
        <div>
          <Text size="md">{task.name}</Text>
          {type === 'QUEUE' && (
            <Text size="xs" color="dimmed" italic>
              {task.url}
            </Text>
          )}
        </div>
        <Actions type={type} />
      </Group>
      {['COPY', 'DOWNLOAD'].includes(type) && (
        <>
          <Space h="xs" />
          <Text size="xs" color="dimmed" weight={300} italic>
            {type === 'COPY' ? 'Copying...' : 'Downloading...'}
          </Text>
          <Space h={5} />
          <Progress
            value={task.progress}
            color={type === 'DOWNLOAD' ? 'blue' : 'green'}
          />
          <Space h="sm" />
          <Group position="apart">
            {task.downloaded && task.totalSize && (
              <Text size="xs">
                {task.downloaded} / {task.totalSize}
              </Text>
            )}
            <Group>
              {type === 'DOWNLOAD' && (
                <Group spacing={0}>
                  <IoArrowDownOutline />
                  {task.downloadSpeed && (
                    <Text size="xs">{task.downloadSpeed}</Text>
                  )}
                </Group>
              )}
              {task.remainingTime && (
                <Text size="xs">{task.remainingTime}</Text>
              )}
            </Group>
          </Group>
        </>
      )}
    </Box>
  )
}

export default TaskComponent
