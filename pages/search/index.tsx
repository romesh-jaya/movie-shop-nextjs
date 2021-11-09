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

// make this dynamic, so that the images are loaded dynamically and not via SSR,
// which causes problems
const SearchResults = dynamic(() => import('../../components/search-results'), {
  ssr: false,
})

type MovieResponse = {
  movie: MovieInfoBasic[]
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
  const [loadingError, setLoadingError] = useState(false)

  const executeQuery = useCallback(
    async (
      queryKeywordInt: string,
      queryTypeInt: string,
      queryGenre?: string[]
    ) => {
      let response: ApolloQueryResult<MovieResponse>
      try {
        setLoading(true)
        if (queryKeywordInt && !queryTypeInt) {
          response = await client.query<MovieResponse>({
            query: getTitlesByKeyword,
            variables: {
              titleSearch: `%${queryKeywordInt}%`,
            },
            fetchPolicy: 'no-cache',
          })
          if (response.data) {
            setMovies(response.data.movie)
          }
        }

        if (queryTypeInt && !queryKeywordInt) {
          if (!queryGenre) {
            response = await client.query<MovieResponse>({
              query: getTitlesByType,
              variables: {
                type: queryTypeInt,
              },
              fetchPolicy: 'no-cache',
            })
          } else {
            response = await client.query<MovieResponse>({
              query: getTitlesByTypeAndGenre,
              variables: {
                type: queryTypeInt,
                genre: queryGenre,
              },
              fetchPolicy: 'no-cache',
            })
          }
          if (response.data) {
            setMovies(response.data.movie)
          }
        }

        if (!queryKeywordInt && !queryTypeInt) {
          if (!queryGenre) {
            response = await client.query<MovieResponse>({
              query: getAllTitles,
              fetchPolicy: 'no-cache',
            })
          } else {
            response = await client.query<MovieResponse>({
              query: getTitlesByGenre,
              variables: {
                genre: queryGenre,
              },
              fetchPolicy: 'no-cache',
            })
          }
          if (response.data) {
            setMovies(response.data.movie)
          }
        }
      } catch {
        setLoadingError(true)
      } finally {
        setLoading(false)
      }

      setQueryExecuted(true)
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
        />
        {searchResults}
      </>
    )
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta name='description' content='Generated by create next app' />
      </Head>
      <Header />
      <div className={`${styles.content} ${styles['column-direction']}`}>
        <div className={styles['query-mobile']}>
          <Query />
        </div>
        <div className={styles['title-row']}>
          <div className={styles.title}>{resultForText}</div>
          <div className={styles['back-button']} onClick={() => router.back()}>
            &#60;BACK
          </div>
        </div>
        {loading && <SpinnerFixedHeight />}
        {loadingError && <p>Error occured while fetching titles</p>}
        {renderSearchResults()}
      </div>
    </div>
  )
}

export default Home
