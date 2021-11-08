import React from 'react'
import { MovieType } from '../../enums/MovieType'
import { NameValue } from '../../types/NameValue'
import Filter from '../filter'
import styles from './FilterBar.module.scss'

const titleTypes: NameValue[] = [
  { name: MovieType.Movie, value: 'Movie' },
  { name: MovieType.TvSeries, value: 'TV Series' },
]

export default function FilterBar() {
  return (
    <div className={styles.container}>
      <Filter title='Type' listOfValues={titleTypes} />
    </div>
  )
}
