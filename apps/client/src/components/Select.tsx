import React, { Fragment } from 'react'
import { IoChevronDownOutline } from 'react-icons/io5'
import { Listbox, Transition } from '@headlessui/react'

import Text from '@/components/Text'

export interface Option {
  id: string
  name: string
  value: string
}

interface SelectProps {
  label?: string
  value: Option
  options: Option[]
  onChange: (value: Option) => void
}

const Select: React.FC<SelectProps> = ({ label, value, options, onChange }) => {
  return (
    <div className="mb-4">
      {label && (
        <div className="mb-2">
          <label htmlFor={label.toLowerCase().split(' ').join('-')}>
            <Text>{label}</Text>
          </label>
        </div>
      )}
      <Listbox value={value} onChange={onChange}>
        <div className="relative mt-1">
          <Listbox.Button className="flex justify-between items-center w-full cursor-default rounded-lg py-2 px-3 bg-secondary dark:bg-secondary-dark">
            <Text>{value.name}</Text>
            <Text>
              <IoChevronDownOutline className="h-5 w-5 text-gray-400" />
            </Text>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((option) => (
                <Listbox.Option
                  key={option.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {option.name}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default Select
