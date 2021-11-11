import React, { useState } from 'react'
import styles from './Filter.module.scss'
import { Popover, Checkbox, Button } from 'antd'
import { NameValue } from '../../types/NameValue'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'

interface IProps {
  title: string
  listOfValues: NameValue[]
  chosenValues: NameValue[]
  setValue?: (arrayValues: NameValue[]) => void
  noOfGridColumns: 1 | 2 | 3
}

export default function Filter(props: IProps) {
  const { title, chosenValues, listOfValues, setValue, noOfGridColumns } = props
  const [popoverOpen, setPopoverOpen] = useState(false)

  const onCheckboxChange = (
    e: CheckboxChangeEvent,
    name: string,
    value: string
  ) => {
    if (setValue) {
      const arrayValues = chosenValues.slice()
      if (e.target.checked) {
        arrayValues.push({ name, value })
        setValue(arrayValues)
      } else {
        const index = arrayValues.findIndex(item => item.name === name)
        if (index >= 0) {
          arrayValues.splice(index, 1)
          setValue(arrayValues)
        }
      }
    }
  }

  const contentPopover = (
    <div
      className={styles['popover-content']}
      style={{ gridTemplateColumns: `repeat(${noOfGridColumns}, 1fr)` }}>
      {listOfValues.map(item => {
        return (
          <div key={item.name}>
            <Checkbox
              className={styles.checkbox}
              checked={!!chosenValues.find(val => val.name === item.name)}
              onChange={(e: CheckboxChangeEvent) =>
                onCheckboxChange(e, item.name, item.value)
              }>
              {item.value}
            </Checkbox>
          </div>
        )
      })}
      <Button
        className={styles['close-button']}
        onClick={() => setPopoverOpen(false)}>
        Close
      </Button>
    </div>
  )

  const handleVisibleChange = (visible: boolean) => {
    setPopoverOpen(visible)
  }

  const renderFilterValue = (): string => {
    if (chosenValues.length === 0) {
      return 'All'
    }
    if (chosenValues.length === 1) {
      return chosenValues[0].value
    }
    return `${chosenValues.length} selected`
  }

  return (
    <Popover
      overlayClassName={styles['popover-content-container']}
      content={contentPopover}
      trigger='click'
      visible={popoverOpen}
      onVisibleChange={handleVisibleChange}>
      <div className={styles.container}>
        <span>{`${title}: `}</span>
        <span>{renderFilterValue()}</span>
      </div>
    </Popover>
  )
}
