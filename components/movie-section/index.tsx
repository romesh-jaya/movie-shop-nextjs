import React, { useEffect, useRef, useState } from 'react'
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import styles from './MovieSection.module.scss'
import { cssValue } from '../../utils/css'
import dynamic from 'next/dynamic'
import { useContainerDimensions } from '../../hooks/useContainerDimensions'

const movieData = require('../../constants/movies-sample-data.json')

const MoviePreview = dynamic(() => import('../movie-preview'), { ssr: false })

const totalSlides = 20
const thumbnailGap = 20

export default function MovieSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)
  const slideWidth = parseInt(cssValue('--thumbnail-width')) + thumbnailGap
  const visibleSlidesAtATime = Math.floor(containerWidth / slideWidth)
  const { width } = useContainerDimensions(containerRef)

  useEffect(() => {
    setContainerWidth(width)
  }, [width])

  const renderSlides = () => {
    const slides = []
    for (let i = 0; i < totalSlides; i++) {
      const movie = movieData[i]
      slides.push(
        <Slide index={i} key={`${movie.type}-${movie.title}`}>
          <MoviePreview
            title={movie.title}
            year={movie.year}
            mediaURL={movie.mediaURL}
            type={movie.type}
          />
        </Slide>
      )
    }
    return slides
  }

  // Note: naturalSlideWidth and naturalSlideHeight are ignored when isIntrinsicHeight is set
  return (
    <div className={styles.container} ref={containerRef}>
      <CarouselProvider
        naturalSlideWidth={10}
        naturalSlideHeight={10}
        totalSlides={totalSlides}
        isIntrinsicHeight
        visibleSlides={visibleSlidesAtATime}
        step={visibleSlidesAtATime}
        className={styles.carousel}>
        <Slider>{renderSlides()}</Slider>
        <ButtonBack className={styles['btn-arrow']}>
          <></>
        </ButtonBack>
        <ButtonNext className={styles['btn-arrow']}>
          <></>
        </ButtonNext>
      </CarouselProvider>
    </div>
  )
}
