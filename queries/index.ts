import { gql } from '@apollo/client'

export const getAllTitles = gql`
  query getAllTitles($limit: Int, $offset: Int) {
    movie(limit: $limit, offset: $offset) {
      imdbID
      mediaURL
      title
      type
      year
    }

    movie_aggregate {
      aggregate {
        count
      }
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
  query getTitlesByKeyword($titleSearch: String!, $limit: Int, $offset: Int) {
    movie(
      where: { title: { _ilike: $titleSearch } }
      limit: $limit
      offset: $offset
    ) {
      imdbID
      mediaURL
      title
      type
      year
    }
    movie_aggregate(where: { title: { _ilike: $titleSearch } }) {
      aggregate {
        count
      }
    }
  }
`

export const getTitlesByType = gql`
  query getTitlesByType($type: String!, $limit: Int, $offset: Int) {
    movie(where: { type: { _eq: $type } }, limit: $limit, offset: $offset) {
      imdbID
      mediaURL
      title
      type
      year
    }
    movie_aggregate(where: { type: { _eq: $type } }) {
      aggregate {
        count
      }
    }
  }
`

export const getTitlesByGenre = gql`
  query getTitlesByGenre($genre: [String!], $limit: Int, $offset: Int) {
    movie(
      where: { genre: { _has_keys_any: $genre } }
      limit: $limit
      offset: $offset
    ) {
      imdbID
      mediaURL
      title
      type
      year
    }
    movie_aggregate(where: { genre: { _has_keys_any: $genre } }) {
      aggregate {
        count
      }
    }
  }
`

export const getTitlesByTypeAndGenre = gql`
  query getTitlesByTypeAndGenre(
    $type: String!
    $genre: [String!]
    $limit: Int
    $offset: Int
  ) {
    movie(
      where: { type: { _eq: $type }, genre: { _has_keys_any: $genre } }
      limit: $limit
      offset: $offset
    ) {
      imdbID
      mediaURL
      title
      type
      year
    }
    movie_aggregate(
      where: { type: { _eq: $type }, genre: { _has_keys_any: $genre } }
    ) {
      aggregate {
        count
      }
    }
  }
`
