import styles from './HeroBanner.module.css'

export default function HeroBanner(){

    return (
        <section className={styles.hero}>
            <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>Find the Perfect Space for Your Event</h1>
                <p className={styles.heroDescription}>Discover and book unique event spaces for any occasion</p>
            </div>
        </section>
    )
}