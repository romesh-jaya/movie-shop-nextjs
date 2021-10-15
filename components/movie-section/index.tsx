import React from 'react'
import MoviePreview from '../movie-preview'

const movieData = require('../../constants/movies-sample-data.json')

export default function MovieSection() {
  const movie = movieData[0]
  return (
    <div>
      <MoviePreview
        title={movie.title}
        year={movie.year}
        mediaURL={movie.mediaURL}
        type={movie.type}
      />
    </div>
  )
}
