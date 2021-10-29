import { gql } from '@apollo/client'

export const getFeaturedTitles = gql`
  query getFeaturedTitles {
    movie(where: { featured: { _eq: true } }) {
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
