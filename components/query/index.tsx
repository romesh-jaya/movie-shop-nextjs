import React, { useState } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import styles from './Query.module.scss'
import { useRouter } from 'next/router'

export default function Query() {
  const router = useRouter()
  const [queryInput, setQueryInput] = useState('')

  const onQueryInputChange = (e?: React.ChangeEvent<HTMLInputElement>) => {
    setQueryInput(e?.target.value || '')
  }

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key === 'Enter' || event.key === 'NumpadEnter') {
      onSearchClicked()
    }
  }

  const onSearchClicked = () => {
    if (queryInput) {
      router.push({
        pathname: '/search',
        query: { keyword: queryInput },
      })
    }
  }

  return (
    <div className={styles.container}>
      <input
        className={styles['query-input']}
        value={queryInput}
        onChange={onQueryInputChange}
        placeholder='Enter keywords...'
        onKeyDown={handleKeyDown}
      />
      <div className={styles['search-container']} onClick={onSearchClicked}>
        <SearchOutlined />
      </div>
    </div>
  )
}
