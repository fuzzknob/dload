import React, { useState } from 'react'
import {
  Box,
  TextInput,
  Modal,
  Textarea,
  Space,
  Select,
  Switch,
  Group,
  Button,
} from '@mantine/core'
import { isNotEmpty, matches, useForm } from '@mantine/form'

import * as taskService from '@/modules/tasks/task-service'

type AddTaskProps = {
  visible: boolean
  onClose: () => void
}

const AddTask: React.FC<AddTaskProps> = ({ visible, onClose }) => {
  const [directDownload, setDirectDownload] = useState(true)
  const form = useForm({
    initialValues: {
      url: '',
      name: '',
      downloadPath: '/Users/username/Downloads',
    },
    validate: {
      url: matches(
        /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
        'Invalid URL',
      ),
      downloadPath: isNotEmpty(),
    },
  })

  function handleSubmit(type: 'DOWNLOAD' | 'QUEUE') {
    const result = form.validate()
    if (result.hasErrors) return
    taskService.addTask({
      ...form.values,
      type,
      directDownload,
    })
    onClose()
  }

  return (
    <Modal
      size="md"
      opened={visible}
      onClose={onClose}
      radius="md"
      centered
      withCloseButton={false}
    >
      <Box
        sx={{
          padding: '10px 5px',
        }}
      >
        <form onSubmit={form.onSubmit(() => handleSubmit('DOWNLOAD'))}>
          <Textarea placeholder="Download url" {...form.getInputProps('url')} />
          <Space h="sm" />
          <TextInput label="File Name" {...form.getInputProps('name')} />
          <Space h="sm" />
          <Select
            label="Save To"
            data={['/Users/username/Downloads', '/downloads2']}
            {...form.getInputProps('downloadPath')}
          />
          <Space h="xl" />
          <Switch
            label="Direct Download"
            checked={directDownload}
            onChange={(event) => setDirectDownload(event.currentTarget.checked)}
          />
          <Space h="xl" />
          <Group position="apart">
            <Button onClick={onClose} variant="subtle" color="gray">
              Cancel
            </Button>
            <Group>
              <Button
                onClick={() => handleSubmit('QUEUE')}
                variant="light"
                color="gray"
              >
                Queue
              </Button>
              <Button type="submit">Download</Button>
            </Group>
          </Group>
        </form>
      </Box>
    </Modal>
  )
}

export default AddTask
