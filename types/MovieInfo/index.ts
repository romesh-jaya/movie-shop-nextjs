import { MovieType } from '../../enums/MovieType'

export type MovieInfo = {
  genre: string[]
  imdbID: string
  pGRating: string
  title: string
  type: MovieType
  year: string
  mediaURL: string
  plot: string
  actors: string
  featured?: boolean
}
