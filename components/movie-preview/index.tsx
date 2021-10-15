import React from 'react'
import styles from './MoviePreview.module.scss'
import Image from 'next/image'
import { MovieType } from '../../enums/MovieType'
import { thumbnailWidth } from '../../constants/appConstants'

interface IProps {
  title: string
  year: string
  type: MovieType.Movie | MovieType.TvSeries
  mediaURL: string
}

export default function MoviePreview(props: IProps) {
  const { title, year, type, mediaURL } = props
  return (
    <div className={styles.container}>
      <div className={styles.poster}>
        <Image
          src={mediaURL}
          alt={title}
          width={`${thumbnailWidth}px`}
          height='287px'
          unoptimized
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
