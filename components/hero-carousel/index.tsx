import React, { ReactElement } from 'react'
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel'
import styles from './HeroCarousel.module.scss'

const slideImages = [
  '/images/hero-1.webp',
  '/images/hero-2.webp',
  '/images/hero-3.webp',
]

export default function HeroCarousel() {
  const renderSlides = () => {
    const slides: ReactElement[] = []
    slideImages.forEach((image, idx) => {
      slides.push(
        <Slide index={idx} key={image}>
          <img
            className={styles.hero}
            src={image}
            alt={`Ultra movies - your best collection of DVD's`}
          />
        </Slide>
      )
    })
    return slides
  }

  return (
    <div className={styles.container}>
      <CarouselProvider
        naturalSlideWidth={10}
        naturalSlideHeight={10}
        totalSlides={3}
        isIntrinsicHeight
        visibleSlides={1}
        isPlaying
        infinite
        interval={3000}
        step={1}>
        <Slider>{renderSlides()}</Slider>
      </CarouselProvider>
      <div className={styles.text}>
        Ultra - Your one-stop destination for DVD&#39;s!
      </div>
    </div>
  )
}
