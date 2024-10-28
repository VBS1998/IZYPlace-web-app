
import styles from './HomePage.module.css'
import { useEffect, useState } from "react"
import { getListings } from "@/app/api/requests/listings"
import { Listing } from "@/app/api/models/listing"
import PageHeader from "@/app/components/header/header"
import HeroBanner from "@/app/components/heroBanner/heroBanner"
import Grid from '@/app/components/grid/grid'
import Footer from '@/app/components/footer/footer'

export default function HomePage() {
  const [eventSpaces, setEventSpaces] = useState<Listing[]>([])

  useEffect(() => {
    getListings().then((listings) => {
      setEventSpaces(listings)
    })
  }, [])

  return (
    <div className={styles.container}>
      {PageHeader()}

      <main>
        {HeroBanner()}
        {Grid({listingsData: eventSpaces})}
      </main>

      {Footer()}
    </div>
  )
}