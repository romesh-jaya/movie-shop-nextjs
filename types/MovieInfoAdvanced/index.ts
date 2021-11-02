import { MovieInfoBasic } from '../MovieInfoBasic'

export type MovieInfoAdvanced = MovieInfoBasic & {
  genre: string[]
  pGRating?: string
  plot?: string
  actors?: string
  featured?: boolean
  languages?: string
}
