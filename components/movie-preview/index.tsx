/* eslint-disable @next/next/no-img-element */
import React from 'react'
import styles from './MoviePreview.module.scss'
import { MovieType } from '../../enums/MovieType'
import { mobileWidth } from '../../constants/appConstants'
import { useWindowWidth } from '@react-hook/window-size'
import { cssValue } from '../../utils/css'

export const thumbnailHeightDesktop = 287
export const thumbnailHeightMobile = 222

interface IProps {
  title: string
  year: string
  type: MovieType.Movie | MovieType.TvSeries
  mediaURL: string
}

export default function MoviePreview(props: IProps) {
  const { title, year, type, mediaURL } = props
  const windowWidth = useWindowWidth()
  const thumbnailHeight =
    windowWidth <= mobileWidth && windowWidth > 0
      ? thumbnailHeightMobile
      : thumbnailHeightDesktop
  const thumbnailWidth = cssValue('--thumbnail-width') || 100

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
