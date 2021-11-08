import React, { useState } from 'react'
import styles from './Filter.module.scss'
import { Popover, Checkbox } from 'antd'
import { NameValue } from '../../types/NameValue'

interface IProps {
  title: string
  value?: string
  listOfValues: NameValue[]
}

export default function Filter(props: IProps) {
  const { title, value, listOfValues } = props
  const [popoverOpen, setPopoverOpen] = useState(false)

  const contentPopover = (
    <div>
      {listOfValues.map(item => {
        return (
          <div key={item.name}>
            <Checkbox className={styles.checkbox}>{item.value}</Checkbox>
          </div>
        )
      })}
    </div>
  )

  const handleVisibleChange = (visible: boolean) => {
    setPopoverOpen(visible)
  }

  return (
    <Popover
      overlayClassName={styles['popover-content']}
      content={contentPopover}
      trigger='click'
      visible={popoverOpen}
      onVisibleChange={handleVisibleChange}>
      <div className={styles.container}>
        <span>{`${title}: `}</span>
        <span>{value ?? 'All'}</span>
      </div>
    </Popover>
  )
}
