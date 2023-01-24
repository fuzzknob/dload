import React from 'react'
import { IoArrowDownOutline } from 'react-icons/io5'
import { Box, Space, Text, Progress, Group } from '@mantine/core'

import { TaskType } from '@/modules/tasks/task-store'

import Actions from './TaskActions'

interface TaskProps {
  type: TaskType
}

const Task: React.FC<TaskProps> = ({ type }) => {
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
          <Text size="md">ubuntu desktop.iso</Text>
          {type === 'QUEUE' && (
            <Text size="xs" color="dimmed" italic>
              https://codeload.github.com/vuejs/vue/tar.gz/refs/tags/v2
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
          <Progress value={20} color={type === 'DOWNLOAD' ? 'blue' : 'green'} />
          <Space h="sm" />
          <Group position="apart">
            <Text size="xs">1.2GB / 3.0GB</Text>
            <Group>
              {type === 'DOWNLOAD' && (
                <Group spacing={0}>
                  <IoArrowDownOutline />
                  <Text size="xs">8.7 MB/s</Text>
                </Group>
              )}
              <Text size="xs">Remaining 3m 56s</Text>
            </Group>
          </Group>
        </>
      )}
    </Box>
  )
}

export default Task
