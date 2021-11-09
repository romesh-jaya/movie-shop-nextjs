import { gql } from '@apollo/client'

export const getAllTitles = gql`
  query getAllTitles {
    movie {
      imdbID
      mediaURL
      title
      type
      year
    }
  }
`

export const getFeaturedTitles = gql`
  query getFeaturedTitles {
    movie(where: { featured: { _eq: true } }) {
      imdbID
      mediaURL
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
      mediaURL
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
      mediaURL
      title
      type
      year
    }
  }
`

export const getTitlesByGenre = gql`
  query getTitlesByGenre($genre: [String!]) {
    movie(where: { genre: { _has_keys_any: $genre } }) {
      imdbID
      mediaURL
      title
      type
      year
    }
  }
`

export const getTitlesByTypeAndGenre = gql`
  query getTitlesByTypeAndGenre($type: String!, $genre: [String!]) {
    movie(where: { type: { _eq: $type }, genre: { _has_keys_any: $genre } }) {
      imdbID
      mediaURL
      title
      type
      year
    }
  }
`
