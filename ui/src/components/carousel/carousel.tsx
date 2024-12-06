import React, { FC, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { Listing } from '@/api/models/listing'
import ListingCell from '../listingCell/listingCell'
import styles from './Carousel.module.css'
import {CircleArrowLeft, CircleArrowRight} from 'lucide-react'
import Image from 'next/image'

interface CarouselProps {
    title? : string
    listingsData? : Listing[]
    imagesData? : string[]
    singleCell? : boolean
}

const Carousel : FC<CarouselProps> = ({title, listingsData, imagesData, singleCell = false  }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
  })

  const slideStyle = singleCell ? styles.embla__slide__single : styles.embla__slide__row
  const navButtonDisabled = singleCell && ((listingsData?.length ?? 0) + (imagesData?.length ?? 0) == 1)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <section className={styles.carouselSection}>
        <div className={styles.carouselContent}>
            <h2 className={styles.carouselTitle}>{title}</h2>
            <div className={styles.carousel}>
                <button className={styles.embla__button} onClick={scrollPrev} disabled={navButtonDisabled}>
                    <CircleArrowLeft className={styles.navButton}/>
                </button>
                <div className={styles.embla} ref={emblaRef}>
                    <div className={styles.embla__container}>
                        {listingsData?.map((listing: Listing) => (
                            <div key={listing.id} className={slideStyle}>
                                {ListingCell({listingData: listing})}
                            </div>
                        )) ?? <></>}
                        {imagesData?.map((url: string) => (
                            <div key={url} className={slideStyle}>
                                <Image src={url} alt={url} width={200} height={120} className={styles.spaceImage}/>
                            </div>
                        )) ?? <></>}
                        {navButtonDisabled ? <div className={slideStyle}/> : null}
                    </div>
                </div>
                <button className={styles.embla__button} onClick={scrollNext} disabled={navButtonDisabled}>
                    <CircleArrowRight className={styles.navButton}/>
                </button>
            </div>
        </div>
    </section>
  )
}

export default Carousel