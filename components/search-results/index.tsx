import React from 'react'
import { MovieInfoBasic } from '../../types/MovieInfoBasic'
import MoviePreview from '../movie-preview'
import styles from './SearchResults.module.scss'

interface IProps {
  movies: MovieInfoBasic[]
}

export default function SearchResults(props: IProps) {
  const { movies } = props
  return (
    <div className={styles.container}>
      {movies.map(movie => (
        <MoviePreview
          key={movie.imdbID}
          title={movie.title}
          year={movie.year}
          mediaURL={movie.mediaURL}
          type={movie.type}
          imdbID={movie.imdbID}
        />
      ))}
    </div>
  )
}
