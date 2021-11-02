import { MovieType } from '../../enums/MovieType'

export type MovieInfoBasic = {
  imdbID: string
  title: string
  type: MovieType
  year: string
  mediaURL?: string
}
