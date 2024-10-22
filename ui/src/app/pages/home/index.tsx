
import styles from './HomePage.module.css'
import { useEffect, useState } from "react"
import { getListings } from "@/app/api/requests/listings"
import { Listing } from "@/app/api/models/listing"
import PageHeader from "@/app/components/header/header"
import HeroBanner from "@/app/components/heroBanner/heroBanner"
import Grid from '@/app/components/grid/grid'

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

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          &copy; {new Date().getFullYear()} IZYPlace. All rights reserved.
        </div>
      </footer>
    </div>
  )
}