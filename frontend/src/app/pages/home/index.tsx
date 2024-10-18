import { MapPin, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import styles from './HomePage.module.css'
import { useEffect, useState } from "react"
import { getListings } from "@/app/api/requests/listings"
import { Listing } from "@/app/api/models/listing"

export default function HomePage() {
  const [eventSpaces, setEventSpaces] = useState<Listing[]>([])

  useEffect(() => {
    getListings().then((listings) => {
      setEventSpaces(listings)
      console.log(listings)
    })
  }, [])

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link href="/" className={styles.logo}>
            <MapPin className={styles.logoIcon} />
            <span className={styles.logoText}>IZYPlace</span>
          </Link>
          <nav>
            <ul className={styles.navList}>
              <li><Link href="/" className={styles.navLink}>Home</Link></li>
              <li><Link href="#" className={styles.navLink}>About</Link></li>
              <li><Link href="#" className={styles.navLink}>Contact</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Find the Perfect Space for Your Event</h1>
            <p className={styles.heroDescription}>Discover and book unique event spaces for any occasion</p>
          </div>
        </section>

        <section className={styles.catalogSection}>
          <div className={styles.catalogContent}>
            <h2 className={styles.catalogTitle}>Featured Event Spaces</h2>
            <div className={styles.catalogGrid}>
              {eventSpaces.map((space : Listing) => (
                <div key={space.ID} className={styles.spaceCard}>
                  <Image src={space.ImageURL} alt={space.Name} width={300} height={200} className={styles.spaceImage} />
                  <div className={styles.spaceContent}>
                    <h3 className={styles.spaceName}>{space.Name}</h3>
                    <p className={styles.spaceLocation}>{space.Location}</p>
                    <div className={styles.spaceRating}>
                      <Star className={styles.ratingIcon} />
                      <span>
                        <h4 className={styles.ratingText}>
                          {space.Rating.toFixed(1)}
                        </h4>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          &copy; {new Date().getFullYear()} IZYPlace. All rights reserved.
        </div>
      </footer>
    </div>
  )
}