import React, { useState } from 'react'
import { MovieType } from '../../enums/MovieType'
import { NameValue } from '../../types/NameValue'
import Filter from '../filter'
import styles from './FilterBar.module.scss'

const titleTypes: NameValue[] = [
  { name: MovieType.Movie, value: 'Movie' },
  { name: MovieType.TvSeries, value: 'TV Series' },
]

interface IProps {
  titleType?: string
}

const initValueType = (titleType: string): NameValue[] => {
  if (titleType) {
    const typeFound = titleTypes.find(type => type.name === titleType)
    if (typeFound) {
      return [typeFound]
    }
  }
  return []
}

export default function FilterBar(props: IProps) {
  const { titleType } = props
  const [valueType, setValueType] = useState<NameValue[]>(
    titleType ? initValueType(titleType) : []
  )

  const setValueTypeInternal = (arrayValues: NameValue[]) => {
    setValueType(arrayValues)
  }

  return (
    <div className={styles.container}>
      <Filter
        title='Type'
        listOfValues={titleTypes}
        chosenValues={valueType}
        setValue={setValueTypeInternal}
      />
    </div>
  )
}
