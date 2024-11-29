import React, { FC, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { Listing } from '@/api/models/listing'
import ListingCell from '../listingCell/listingCell'
import styles from './Carousel.module.css'
import {CircleArrowLeft, CircleArrowRight} from 'lucide-react'
import Image from 'next/image'

interface CarouselProps {
    listingsData? : Listing[]
}

const Carousel : FC<CarouselProps> = ( props ) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
  })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <section className={styles.carouselSection}>
        <div className={styles.carouselContent}>
            <h2 className={styles.carouselTitle}>Veja nossos espaços mais requisitados!</h2>
            <div className={styles.carousel}>
                <button className="embla__prev" onClick={scrollPrev}>
                    <CircleArrowLeft className={styles.navButton}/>
                </button>
                <div className={styles.embla} ref={emblaRef}>
                    <div className={styles.embla__container}>
                        {props.listingsData?.map((listing: Listing) => (
                            <div key={listing.id} className={styles.embla__slide}>
                                {ListingCell({listingData: listing})}
                            </div>
                        )) ?? <></>}
                    </div>
                </div>
                <button className="embla__next" onClick={scrollNext}>
                    <CircleArrowRight className={styles.navButton}/>
                </button>
            </div>
        </div>
    </section>
  )
}

export default Carousel