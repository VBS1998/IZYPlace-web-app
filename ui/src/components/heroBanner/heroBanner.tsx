import styles from './HeroBanner.module.css'

export default function HeroBanner(){

    return (
        <section className={styles.hero}>
            <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}></h1>
                <p className={styles.heroDescription}></p>
            </div>
        </section>
    )
}