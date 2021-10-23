import React from 'react'
import { MovieInfo } from '../../types/MovieInfo'
import styles from './MovieDetail.module.scss'
import {
  heightToWidthAlbumArt,
  portraitImage,
} from '../../constants/appConstants'

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
        <div className={styles.title}>{movie.title}</div>
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
            <tr>
              <td>Actors</td>
              <td>{movie.actors}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
