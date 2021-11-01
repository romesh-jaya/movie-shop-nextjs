import { gql } from '@apollo/client'

export const getFeaturedTitles = gql`
  query getFeaturedTitles {
    movie(where: { featured: { _eq: true } }) {
      imdbID
      actors
      featured
      genre
      languages
      mediaURL
      pGRating
      plot
      title
      type
      year
    }
  }
`

export const getTitleDetails = gql`
  query getTitleDetails($imdbID: String!) {
    movie(where: { imdbID: { _eq: $imdbID } }) {
      imdbID
      actors
      featured
      genre
      languages
      mediaURL
      pGRating
      plot
      title
      type
      year
    }
  }
`

export const getTitlesByKeyword = gql`
  query getTitlesByKeyword($titleSearch: String!) {
    movie(where: { title: { _ilike: $titleSearch } }) {
      imdbID
      actors
      featured
      genre
      languages
      mediaURL
      pGRating
      plot
      title
      type
      year
    }
  }
`

export const getTitlesByType = gql`
  query getTitlesByType($type: String!) {
    movie(where: { type: { _eq: $type } }) {
      imdbID
      actors
      featured
      genre
      languages
      mediaURL
      pGRating
      plot
      title
      type
      year
    }
  }
`
