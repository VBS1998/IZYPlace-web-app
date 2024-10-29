"use client"
import styles from './HomePage.module.css'
import { useEffect, useState } from "react"
import { getListings } from "@/api/requests/listings"
import { Listing } from "@/api/models/listing"
import PageHeader from "@/components/header/header"
import HeroBanner from "@/components/heroBanner/heroBanner"
import Grid from '@/components/grid/grid'
import Footer from '@/components/footer/footer'

export default function HomePage() {
  const [eventSpaces, setEventSpaces] = useState<Listing[]>([])

  useEffect(() => {
    getListings().then((listings) => {
      setEventSpaces(listings)
    })
  }, [])

  return (
    <div className={styles.container}>
      <PageHeader />

      <main>
        <HeroBanner />
        <Grid listingsData={eventSpaces} />
      </main>

      <Footer />
    </div>
  )
}