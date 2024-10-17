import { MapPin, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import styles from './HomePage.module.css'

export default function HomePage2() {
  const eventSpaces = [
    { id: 1, name: "Elegant Ballroom", location: "Downtown", rating: 4.8, image: "https://www.theknot.com/tk-media/images/30f341d8-b9fa-a0e9-7c6a-a943e99f4365~rs_1458.h?quality=60" },
    { id: 2, name: "Rustic Barn", location: "Countryside", rating: 4.6, image: "https://nationaltoday.com/wp-content/uploads/2022/05/133-Barn-Day-1200x834.jpg?quality=60" },
    { id: 3, name: "Modern Loft", location: "City Center", rating: 4.7, image: "https://img.freepik.com/premium-photo/interior-design-modern-loft-apartment-living-room-3d-rendering_1040322-228.jpg?quality=60" },
    { id: 4, name: "Beachfront Pavilion", location: "Coastal Area", rating: 4.9, image: "https://www.fullerholidays.com.au/wp-content/uploads/2024/08/beachfront-pavilion-belongil-1.jpg?quality=60" },
    { id: 5, name: "Garden Terrace", location: "Suburban", rating: 4.5, image: "https://www.editionhotels.com/wp-content/uploads/2020/12/201117_EDT_Tokyo2_30_RGB_V2-scaled.jpg?quality=60" },
    { id: 6, name: "Historic Mansion", location: "Old Town", rating: 4.8, image: "https://media.architecturaldigest.com/photos/5d012732c9f2f20ac8f26900/16:9/w_6144,h_3456,c_limit/housefront12x8.jpg?quality=60" },
  ]

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
              {eventSpaces.map((space) => (
                <div key={space.id} className={styles.spaceCard}>
                  <Image src={space.image} alt={space.name} width={300} height={200} className={styles.spaceImage} />
                  <div className={styles.spaceContent}>
                    <h3 className={styles.spaceName}>{space.name}</h3>
                    <p className={styles.spaceLocation}>{space.location}</p>
                    <div className={styles.spaceRating}>
                      <Star className={styles.ratingIcon} />
                      <span>
                        <h4 className={styles.ratingText}>
                          {space.rating.toFixed(1)}
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