import React from 'react'
import { IoArrowDownOutline } from 'react-icons/io5'
import { Box, Space, Text, Progress, Group } from '@mantine/core'
import { modals } from '@mantine/modals'
import copyToClipboard from 'copy-to-clipboard'
import { Task } from '@dload/shared'

import * as taskService from '@/modules/tasks/task-service'

import Actions from './TaskActions'

interface TaskProps {
  task: Task
}

const TaskComponent: React.FC<TaskProps> = ({ task }) => {
  const { type } = task

  function copyDownloadLink() {
    copyToClipboard(task.url)
  }

  function removeTask() {
    modals.openConfirmModal({
      title: 'Are you sure?',
      onConfirm: () => taskService.removeTask(task.id),
    })
  }

  function togglePause() {
    taskService.togglePause(task.id)
  }

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
        <Actions
          task={task}
          togglePause={togglePause}
          removeTask={removeTask}
          copyDownloadLink={copyDownloadLink}
        />
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
            {['IN_PROGRESS'].includes(task.status) && (
              <Group>
                {type === 'DOWNLOAD' && (
                  <Group spacing={0}>
                    {task.downloadSpeed && (
                      <>
                        <IoArrowDownOutline />
                        <Text size="xs">{task.downloadSpeed}</Text>
                      </>
                    )}
                  </Group>
                )}
                {task.remainingTime && (
                  <Text size="xs">{task.remainingTime}</Text>
                )}
              </Group>
            )}
          </Group>
        </>
      )}
    </Box>
  )
}

export default TaskComponent
