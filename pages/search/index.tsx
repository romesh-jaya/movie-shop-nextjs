import type { NextPage } from 'next'
import Head from 'next/head'
import React, { ReactElement, useCallback, useEffect, useState } from 'react'
import Header from '../../components/header'
import styles from '../../styles/Pages.module.scss'
import dynamic from 'next/dynamic'
import { MovieInfoBasic } from '../../types/MovieInfoBasic'
import { useRouter } from 'next/router'
import { titleBase } from '../../constants/appConstants'
import Query from '../../components/query'
import { ApolloQueryResult, useApolloClient } from '@apollo/client'
import {
  getAllTitles,
  getTitlesByGenre,
  getTitlesByKeyword,
  getTitlesByType,
  getTitlesByTypeAndGenre,
} from '../../queries'
import SpinnerFixedHeight from '../../components/spinner-fixed-height'
import FilterBar from '../../components/filter-bar'
import { Button } from 'antd'
import QueryContext from '../../context/query-context'

const fetchTitleLimit = 10

// make this dynamic, so that the images are loaded dynamically and not via SSR,
// which causes problems
const SearchResults = dynamic(() => import('../../components/search-results'), {
  ssr: false,
})

type MovieResponse = {
  movie?: MovieInfoBasic[]
  movie_aggregate?: {
    aggregate: {
      count: number
    }
  }
}

// Note: we couldn't use useLazyQuery due to the behaviour outlined in
// https://github.com/apollographql/apollo-client/issues/5912. Was forced to use useApolloClient instead

const Home: NextPage = () => {
  const router = useRouter()
  const { keyword, type, genre } = router.query
  const [queryExecuted, setQueryExecuted] = useState(false)
  const client = useApolloClient()
  const [movies, setMovies] = useState<MovieInfoBasic[]>([])
  const resultForText = keyword ? 'Result for: ' + keyword : `Filter titles`
  const title = keyword || type ? titleBase + ' - ' + resultForText : ''
  const [loading, setLoading] = useState(false)
  const [loadingButton, setLoadingButton] = useState(false)
  const [loadingError, setLoadingError] = useState(false)
  const [resultCount, setResultCount] = useState(0)
  const [currentResultOffset, setCurrentResultOffset] = useState(0)
  const [queryInput, setQueryInput] = useState('')

  const onLoadMoreTitlesClicked = () => {
    const newOffset = currentResultOffset + fetchTitleLimit
    executeQuery(
      keyword as string,
      type as string,
      genre as string[] | undefined,
      newOffset,
      false // Don't call setLoading(true) in this scenario
    )
    setCurrentResultOffset(newOffset)
  }

  const executeQuery = useCallback(
    async (
      queryKeywordInt: string,
      queryTypeInt: string,
      queryGenre?: string[],
      queryOffset?: number,
      setLoadingInComponent: boolean = true
    ) => {
      let response: ApolloQueryResult<MovieResponse> = {
        data: {},
        loading: false,
        networkStatus: 7,
      }
      const offset = queryOffset ?? 0
      if (!queryOffset) {
        setCurrentResultOffset(0)
      }
      try {
        setLoadingInComponent && setLoading(true)
        !setLoadingInComponent && setLoadingButton(true)
        if (queryKeywordInt && !queryTypeInt) {
          response = await client.query<MovieResponse>({
            query: getTitlesByKeyword,
            variables: {
              titleSearch: `%${queryKeywordInt}%`,
              limit: fetchTitleLimit,
              offset,
            },
          })
        }

        if (queryTypeInt && !queryKeywordInt) {
          if (queryTypeInt === 'all') {
            if (!queryGenre) {
              response = await client.query<MovieResponse>({
                query: getAllTitles,
                variables: {
                  limit: fetchTitleLimit,
                  offset,
                },
              })
            } else {
              response = await client.query<MovieResponse>({
                query: getTitlesByGenre,
                variables: {
                  genre: queryGenre,
                  limit: fetchTitleLimit,
                  offset,
                },
              })
            }
          } else {
            if (!queryGenre) {
              response = await client.query<MovieResponse>({
                query: getTitlesByType,
                variables: {
                  type: queryTypeInt,
                  limit: fetchTitleLimit,
                  offset,
                },
              })
            } else {
              response = await client.query<MovieResponse>({
                query: getTitlesByTypeAndGenre,
                variables: {
                  type: queryTypeInt,
                  genre: queryGenre,
                  limit: fetchTitleLimit,
                  offset,
                },
              })
            }
          }
        }

        if (response.data.movie && response.data.movie_aggregate) {
          if (queryOffset) {
            // Add the newly fetched movies to the current set
            setMovies(movies => {
              const newArray = movies.slice()
              if (response.data.movie) {
                newArray.push(...response.data.movie)
              }
              return newArray
            })
          } else {
            setMovies(response.data.movie)
          }
          setResultCount(response.data.movie_aggregate.aggregate.count)
          setQueryExecuted(true)
        }
      } catch {
        setLoadingError(true)
        setQueryExecuted(true)
      } finally {
        setLoading(false)
        setLoadingButton(false)
      }
    },
    [client]
  )

  useEffect(() => {
    executeQuery(
      keyword as string,
      type as string,
      genre as string[] | undefined
    )
    // Note: purposely left out executeQuery from dependancy array.
    // We don't want to re-execute when executeQuery changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, type, genre])

  const renderSearchResults = () => {
    let searchResults: ReactElement

    if (!queryExecuted || loading || loadingError) {
      return null
    }

    if (keyword && movies.length === 0) {
      searchResults = (
        <p className={styles['no-results']}>
          No results found. Try searching for a different keyword
        </p>
      )
    } else if (type && movies.length === 0) {
      searchResults = <p className={styles['no-results']}>No results found</p>
    } else {
      searchResults = <SearchResults movies={movies} />
    }

    return (
      <>
        <FilterBar
          titleType={type as string}
          titleGenre={genre as string[] | undefined}
          setQueryInput={setQueryInput}
        />
        {searchResults}
        {resultCount > currentResultOffset + fetchTitleLimit && (
          <Button
            className={styles['load-more-button']}
            loading={loadingButton}
            onClick={onLoadMoreTitlesClicked}>
            Load more titles
          </Button>
        )}
      </>
    )
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta name='description' content='Generated by create next app' />
      </Head>
      <QueryContext.Provider value={queryInput}>
        <Header setQueryInput={setQueryInput} />
        <div className={`${styles.content} ${styles['column-direction']}`}>
          <div className={styles['query-mobile']}>
            <Query setQueryInput={setQueryInput} />
          </div>
          <div className={styles['title-row']}>
            <div className={styles.title}>{resultForText}</div>
            <div
              className={styles['back-button']}
              onClick={() => router.back()}>
              &#60;BACK
            </div>
          </div>
          {loading && <SpinnerFixedHeight />}
          {loadingError && <p>Error occured while fetching titles</p>}
          {renderSearchResults()}
        </div>
      </QueryContext.Provider>
    </div>
  )
}

export default Home
