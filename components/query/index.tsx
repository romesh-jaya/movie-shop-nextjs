import React, { useState } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import styles from './Query.module.scss'

export default function Query() {
  const [queryInput, setQueryInput] = useState('')

  const onQueryInputChange = (e?: React.ChangeEvent<HTMLInputElement>) => {
    setQueryInput(e?.target.value || '')
  }

  return (
    <div className={styles.container}>
      <input
        className={styles['query-input']}
        value={queryInput}
        onChange={onQueryInputChange}
      />
      <div className={styles['search-container']}>
        <SearchOutlined />
      </div>
    </div>
  )
}
