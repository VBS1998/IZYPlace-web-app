"use client"
import styles from './HomePage.module.css'
import { useEffect, useState } from "react"
import { getListings } from "@/api/requests/listings"
import { Listing } from "@/api/models/listing"
import PageHeader from "@/components/header/header"
import HeroBanner from "@/components/heroBanner/heroBanner"
import Footer from '@/components/footer/footer'
import SearchBox from '@/components/searchBox/searchBox'
import Carousel from '@/components/carousel/carousel'

export default function HomePage() {
  const [eventSpaces, setEventSpaces] = useState<Listing[]>([])

  useEffect(() => {
    getListings().then((listings) => {
      setEventSpaces(listings)
    })
  }, [])

  const onSearch = ( query : string) => {
    const searchString = query ? "?query=" + query : ""
    window.location.href = "/search" + searchString
  }

  return (
    <div className={styles.container}>
      <PageHeader />

      <main className={styles.main}>
        <HeroBanner />
        <div className={styles.searchBoxWrapper}>
          <SearchBox title='Procurou, achou. Fácil assim, como um estalo de dedos!' placeholder='Digite aqui o espaço que deseja' onSearch={onSearch}/>
        </div>
        <Carousel listingsData={eventSpaces.slice(0, 5)} />
      </main>

      <Footer />
    </div>
  )
}