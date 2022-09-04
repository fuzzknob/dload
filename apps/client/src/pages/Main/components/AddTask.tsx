import React, { useState } from 'react'

import Modal from '@/components/Modal'
import Input from '@/components/Input'
import Select, { Option } from '@/components/Select'
import Toggle from '@/components/Toggle'

interface AddTaskProps {
  visible: boolean
  onClose: () => void
}

const AddTask: React.FC<AddTaskProps> = ({ visible, onClose }) => {
  const [value, setValue] = useState('')
  const [option, setOption] = useState<Option>({
    id: '1',
    name: '/downloads',
    value: '/downloads',
  })
  const [cacheValue, setCacheValue] = useState(false)
  return (
    <Modal visible={visible} onClose={onClose}>
      <Input
        type="textarea"
        value={value}
        setValue={setValue}
        placeholder="URL"
      />
      <Input label="Rename" value={value} setValue={setValue} />
      <Select
        label="Save To"
        value={option}
        onChange={(newOption) => setOption(newOption)}
        options={[
          { id: '1', name: '/downloads', value: '/downloads' },
          { id: '2', name: '/d2', value: '/d2' },
        ]}
      />
      <Toggle value={cacheValue} toggle={() => setCacheValue(!cacheValue)} />
    </Modal>
  )
}

export default AddTask
