import React from 'react'
import { Switch } from '@headlessui/react'

interface ToggleProps {
  value: boolean
  toggle: () => void
}

const Toggle: React.FC<ToggleProps> = ({ value, toggle }) => {
  return (
    <div>
      <Switch
        checked={value}
        onChange={toggle}
        className={`${value ? 'bg-blue-highlight' : 'bg-secondary'}
          relative inline-flex h-[20px] w-[38px] shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span
          aria-hidden="true"
          className={`${value ? 'translate-x-5' : 'translate-x-0'}
            pointer-events-none inline-block h-[19px] w-[19px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  )
}

export default Toggle
