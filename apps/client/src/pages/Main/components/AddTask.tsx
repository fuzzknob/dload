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
import { z } from 'zod'
import { useForm, zodResolver } from '@mantine/form'
import { notifications } from '@mantine/notifications'

import * as taskService from '@/modules/tasks/task-service'
import { useSettingStore } from '@/modules/settings/setting-store'

const addTaskSchema = z.object({
  url: z.string().url(),
  name: z.string().optional(),
  downloadPath: z.string(),
})

type AddTaskProps = {
  visible: boolean
  onClose: () => void
}

const AddTask: React.FC<AddTaskProps> = ({ visible, onClose }) => {
  const [isSubmitting, setSubmitting] = useState(false)
  const [directDownload, setDirectDownload] = useState(true)
  const { downloadPaths } = useSettingStore(({ settings }) => settings)
  const form = useForm({
    validate: zodResolver(addTaskSchema),
    initialValues: {
      url: '',
      name: '',
      downloadPath: downloadPaths[0],
    },
    transformValues: (values) => ({
      ...values,
      url: values.url.trim(),
      name: values.name.trim(),
      downloadPath: values.downloadPath.trim(),
    }),
  })

  function close() {
    onClose()
    form.reset()
    setDirectDownload(false)
  }

  async function handleSubmit(type: 'DOWNLOAD' | 'QUEUE') {
    const result = form.validate()
    if (result.hasErrors) return
    setSubmitting(true)
    try {
      await taskService.addTask({
        ...form.getTransformedValues(),
        type,
        directDownload,
      })
      close()
    } catch (e) {
      notifications.show({
        title: 'Failure',
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
      onClose={close}
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
            data={downloadPaths}
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
            <Button onClick={close} variant="subtle" color="gray">
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
