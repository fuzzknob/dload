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
import { notifications } from '@mantine/notifications'

import * as taskService from '@/modules/tasks/task-service'

type AddTaskProps = {
  visible: boolean
  onClose: () => void
}

const AddTask: React.FC<AddTaskProps> = ({ visible, onClose }) => {
  const [isSubmitting, setSubmitting] = useState(false)
  const [directDownload, setDirectDownload] = useState(true)
  const form = useForm({
    initialValues: {
      url: '',
      name: '',
      downloadPath: '/Users/fuzzknob/Downloads',
    },
    validate: {
      url: matches(
        /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
        'Invalid URL',
      ),
      downloadPath: isNotEmpty(),
    },
  })

  async function handleSubmit(type: 'DOWNLOAD' | 'QUEUE') {
    const result = form.validate()
    if (result.hasErrors) return
    setSubmitting(true)
    try {
      await taskService.addTask({
        ...form.values,
        type,
        directDownload,
      })
      onClose()
    } catch (e) {
      notifications.show({
        title: 'Error',
        message: 'Error while adding task',
        color: 'red',
      })
    } finally {
      setSubmitting(false)
    }
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
            data={['/Users/fuzzknob/Downloads', '/downloads2']}
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
              <Button loading={isSubmitting} type="submit">
                Download
              </Button>
            </Group>
          </Group>
        </form>
      </Box>
    </Modal>
  )
}

export default AddTask
