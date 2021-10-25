import React from 'react'
import { useRouter } from 'next/router'
import styles from './MoviePreview.module.scss'
import { MovieType } from '../../enums/MovieType'
import prettyUrl from '../../utils/prettyURL'
import { portraitImage } from '../../constants/appConstants'

interface IProps {
  title: string
  year: string
  type: MovieType.Movie | MovieType.TvSeries
  mediaURL?: string
  imdbID: string
}

export default function MoviePreview(props: IProps) {
  const router = useRouter()
  const { title, year, type, mediaURL, imdbID } = props

  const onPosterClicked = () => {
    const id = imdbID + '-' + prettyUrl(title)
    router.push(
      {
        pathname: '/titles/[id]',
        query: { id },
      },
      `/titles/${id}`,
      { shallow: true }
    )
  }

  return (
    <div className={styles.container} onClick={onPosterClicked}>
      <div className={styles.poster}>
        <img src={mediaURL ?? portraitImage} alt={title} />
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
