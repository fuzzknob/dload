import React from 'react'
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

interface AddTaskProps {
  visible: boolean
  onClose: () => void
}

const AddTask: React.FC<AddTaskProps> = ({ visible, onClose }) => {
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
        <Textarea placeholder="Download url" />
        <Space h="sm" />
        <TextInput label="File Name" value="ubuntu.iso" />
        <Space h="sm" />
        <Select
          label="Save To"
          value="/downloads"
          data={['/downloads', '/downloads2']}
        />
        <Space h="xl" />
        <Switch label="Direct Download" />
        <Space h="xl" />
        <Group position="apart">
          <Button onClick={onClose} variant="subtle" color="gray">
            Cancel
          </Button>
          <Group>
            <Button variant="light" color="gray">
              Queue
            </Button>
            <Button>Download</Button>
          </Group>
        </Group>
      </Box>
    </Modal>
  )
}

export default AddTask
