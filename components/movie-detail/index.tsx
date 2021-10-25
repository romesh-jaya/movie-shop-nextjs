import React from 'react'
import ReactStars from 'react-rating-stars-component'
import { MovieInfo } from '../../types/MovieInfo'
import styles from './MovieDetail.module.scss'
import {
  heightToWidthAlbumArt,
  portraitImage,
} from '../../constants/appConstants'
import { MovieType } from '../../enums/MovieType'

interface IProps {
  movie: MovieInfo
}

const posterWidth = 300
const posterHeight = posterWidth * heightToWidthAlbumArt

export default function MovieDetail(props: IProps) {
  const { movie } = props
  return (
    <div className={styles.container}>
      <div className={styles.poster}>
        <img
          src={movie.mediaURL ?? portraitImage}
          alt={movie.title}
          width={`${posterWidth}px`}
          height={`${posterHeight}px`}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>
          {movie.title}
          <div className={styles['aux-info']}>
            <div className={styles.type}>
              {movie.type === MovieType.Movie ? 'mov' : 'tv'}
            </div>
            <ReactStars
              count={5}
              value={3}
              activeColor='#ffd700'
              edit={false}
            />
          </div>
        </div>
        <div className={styles.plot}>{movie.plot}</div>
        <table>
          <colgroup className={styles.colgroup}>
            <col span={1} />
            <col span={1} />
          </colgroup>
          <tbody>
            <tr>
              <td>Year</td>
              <td>{movie.year}</td>
            </tr>
            {movie.actors && (
              <tr>
                <td>Actors</td>
                <td>{movie.actors}</td>
              </tr>
            )}
            {movie.pGRating && (
              <tr>
                <td>PG Rating</td>
                <td>{movie.pGRating}</td>
              </tr>
            )}
            {movie.genre.length && (
              <tr>
                <td>Genres</td>
                <td>{movie.genre.join(', ')}</td>
              </tr>
            )}
            {movie.languages && (
              <tr>
                <td>Languages</td>
                <td>{movie.languages}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
