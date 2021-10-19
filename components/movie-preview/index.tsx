/* eslint-disable @next/next/no-img-element */
import React from 'react'
import styles from './MoviePreview.module.scss'
import { MovieType } from '../../enums/MovieType'
import { cssValue } from '../../utils/css'

interface IProps {
  title: string
  year: string
  type: MovieType.Movie | MovieType.TvSeries
  mediaURL: string
}

export default function MoviePreview(props: IProps) {
  const { title, year, type, mediaURL } = props
  const thumbnailWidth = cssValue('--thumbnail-width')
  const thumbnailHeight = parseInt(thumbnailWidth) * 1.48 // This is the height to width ratio of the album art

  return (
    <div className={styles.container}>
      <div className={styles.poster}>
        <img
          src={mediaURL}
          alt={title}
          width={`${thumbnailWidth}px`}
          height={`${thumbnailHeight}px`}
        />
      </div>
      <div>
        <p className={styles.title}>{title}</p>
        <div className={styles['info-line']}>
          <div className={styles.year}>{year}</div>
          <div className={styles.type}>
            {type === MovieType.Movie ? 'mov' : 'tv'}
          </div>
        </div>
      </div>
    </div>
  )
}
