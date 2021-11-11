import React, { useContext } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import styles from './Query.module.scss'
import { useRouter } from 'next/router'
import QueryContext from '../../context/query-context'

interface IProps {
  setQueryInput: (query: string) => void
}

export default function Query(props: IProps) {
  const queryInput = useContext(QueryContext)
  const { setQueryInput } = props
  const router = useRouter()

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
