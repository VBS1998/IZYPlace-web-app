"use client"
import styles from './HomePage.module.css'
import { useEffect, useState } from "react"
import { getListings } from "@/api/requests/listings"
import { Listing } from "@/api/models/listing"
import PageHeader from "@/components/header/header"
import HeroBanner from "@/components/heroBanner/heroBanner"
import Grid from '@/components/grid/grid'
import Footer from '@/components/footer/footer'
import SearchBox from '@/components/searchBox/searchBox'

export default function HomePage() {
  const [eventSpaces, setEventSpaces] = useState<Listing[]>([])
  
  console.log(process.env.API_URL)

  useEffect(() => {
    getListings().then((listings) => {
      setEventSpaces(listings)
    })
  }, [])

  return (
    <div className={styles.container}>
      <PageHeader />

      <main className={styles.main}>
        <HeroBanner />
        <div className={styles.searchBoxWrapper}>
          <SearchBox title='Procurou, achou. Fácil assim, como um estalo de dedos!' placeholder='Digite aqui o espaço que deseja' onSearch={(query) => {}}/>
        </div>
        <Grid listingsData={eventSpaces} />
      </main>

      <Footer />
    </div>
  )
}