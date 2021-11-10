import { Button } from 'antd'
import React, { useState } from 'react'
import { MovieType } from '../../enums/MovieType'
import { NameValue } from '../../types/NameValue'
import Filter from '../filter'
import styles from './FilterBar.module.scss'
import { useRouter } from 'next/router'
import { Genres } from '../../constants/genres'

const titleTypes: NameValue[] = [
  { name: MovieType.Movie, value: 'Movie' },
  { name: MovieType.TvSeries, value: 'TV Series' },
]

type QueryObject = {
  type?: string
  genre?: string[]
}

interface IProps {
  titleType?: string
  titleGenre?: string[]
}

const initValueType = (titleType: string): NameValue[] => {
  const typeFound = titleTypes.find(type => type.name === titleType)
  if (typeFound) {
    return [typeFound]
  }
  return []
}

const initValueGenre = (titleGenre: string[]): NameValue[] => {
  const filteredGenres: NameValue[] = []

  Genres.forEach(genre => {
    if (titleGenre.includes(genre.name)) {
      filteredGenres.push(genre)
    }
  })

  return filteredGenres
}

export default function FilterBar(props: IProps) {
  const router = useRouter()
  const { titleType, titleGenre } = props
  const [valueType, setValueType] = useState<NameValue[]>(
    titleType ? initValueType(titleType) : []
  )
  const [valueGenre, setValueGenre] = useState<NameValue[]>(
    titleGenre && titleGenre.length > 0 ? initValueGenre(titleGenre) : []
  )

  const setValueTypeInternal = (arrayValues: NameValue[]) => {
    setValueType(arrayValues)
  }

  const setValueGenreInternal = (arrayValues: NameValue[]) => {
    setValueGenre(arrayValues)
  }

  const onApplyFilterClicked = () => {
    const query: QueryObject = {}
    if (valueType.length === 1) {
      query.type = valueType[0].name
    } else if (valueType.length === 0 || valueType.length === 2) {
      query.type = 'all'
    }
    if (valueGenre.length >= 1) {
      query.genre = valueGenre.map(genre => genre.name)
    }
    router.push({
      pathname: '/search',
      query,
    })
  }

  const onClearFilterClicked = () => {
    setValueType([])
    setValueGenre([])
  }

  return (
    <div className={styles.container}>
      <Filter
        title='Type'
        listOfValues={titleTypes}
        chosenValues={valueType}
        setValue={setValueTypeInternal}
        noOfGridColumns={1}
      />
      <Filter
        title='Genre'
        listOfValues={Genres}
        chosenValues={valueGenre}
        setValue={setValueGenreInternal}
        noOfGridColumns={3}
      />
      <Button
        className={styles['clear-filters-button']}
        onClick={onClearFilterClicked}>
        Clear Filters
      </Button>
      <Button
        className={styles['apply-filters-button']}
        onClick={onApplyFilterClicked}>
        Apply Filters
      </Button>
    </div>
  )
}
