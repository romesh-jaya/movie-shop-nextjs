import React, { useEffect, useRef, useState, ReactElement } from 'react'
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from 'pure-react-carousel'
import styles from './MovieSection.module.scss'
import { cssValue } from '../../utils/css'
import { useContainerDimensions } from '../../hooks/useContainerDimensions'
import { MovieInfoAdvanced } from '../../types/MovieInfoAdvanced'
import MoviePreview from '../movie-preview'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

const thumbnailGap = 20

interface IProps {
  sectionTitle: string
  movies: MovieInfoAdvanced[]
}

export default function MovieSection(props: IProps) {
  const { sectionTitle, movies } = props
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)
  const slideWidth = parseInt(cssValue('--thumbnail-width')) + thumbnailGap
  const visibleSlidesAtATime = Math.floor(containerWidth / slideWidth)
  const { width } = useContainerDimensions(containerRef)

  useEffect(() => {
    setContainerWidth(width)
  }, [width])

  const renderSlides = () => {
    const slides: ReactElement[] = []
    movies.forEach((movie, idx) => {
      slides.push(
        <Slide index={idx} key={movie.imdbID} className={styles.slide}>
          <MoviePreview
            title={movie.title}
            year={movie.year}
            mediaURL={movie.mediaURL}
            type={movie.type}
            imdbID={movie.imdbID}
          />
        </Slide>
      )
    })
    return slides
  }

  // Note: naturalSlideWidth and naturalSlideHeight are ignored when isIntrinsicHeight is set
  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.title}>{sectionTitle}</div>
      <CarouselProvider
        naturalSlideWidth={10}
        naturalSlideHeight={10}
        totalSlides={movies.length}
        isIntrinsicHeight
        visibleSlides={visibleSlidesAtATime}
        step={visibleSlidesAtATime}>
        <Slider>{renderSlides()}</Slider>
        <ButtonBack
          className={`${styles['btn-arrow']} ${styles['back-button']}`}>
          <LeftOutlined />
        </ButtonBack>
        <ButtonNext
          className={`${styles['btn-arrow']} ${styles['next-button']}`}>
          <RightOutlined />
        </ButtonNext>
      </CarouselProvider>
    </div>
  )
}
