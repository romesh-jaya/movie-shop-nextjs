import React from 'react'
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import styles from './MovieSection.module.scss'
import { useWindowWidth } from '@react-hook/window-size'
import { cssValue } from '../../utils/css'
import dynamic from 'next/dynamic'

const movieData = require('../../constants/movies-sample-data.json')

const MoviePreview = dynamic(() => import('../movie-preview'), { ssr: false })

const totalSlides = 20
const thumbnailGap = 20

export default function MovieSection() {
  const windowWidth = useWindowWidth()
  const carouselWidth =
    windowWidth < 1200 && windowWidth > 0 ? windowWidth * 0.9 : 1200
  const slideWidth = parseInt(cssValue('--thumbnail-width')) + thumbnailGap
  const visibleSlidesAtATime = Math.floor(carouselWidth / slideWidth)

  const renderSlides = () => {
    const slides = []
    for (let i = 0; i < totalSlides; i++) {
      const movie = movieData[i]
      slides.push(
        <Slide index={i} key={`${movie.type}-${movie.title}`}>
          {' '}
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
    <div>
      <CarouselProvider
        naturalSlideWidth={10}
        naturalSlideHeight={10}
        totalSlides={totalSlides}
        isIntrinsicHeight
        visibleSlides={visibleSlidesAtATime}
        step={visibleSlidesAtATime}
        className={styles.carousel}>
        <Slider style={{ width: `${carouselWidth}px` }}>
          {renderSlides()}
        </Slider>
        <ButtonBack>Back</ButtonBack>
        <ButtonNext>Next</ButtonNext>
      </CarouselProvider>
    </div>
  )
}
