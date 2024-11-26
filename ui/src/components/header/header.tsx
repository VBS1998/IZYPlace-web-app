import { MapPin } from "lucide-react"
import styles from './PageHeader.module.css'
import Link from "next/link"


export default function PageHeader() {

    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <Link href="/" className={styles.logo}>
                    <MapPin className={styles.logoIcon} />
                    <span className={styles.logoText}>IZYPlace</span>
                </Link>
                <nav>
                    <ul className={styles.navList}>
                        <li><Link href="/" className={styles.navLink}>Como Funciona</Link></li>
                        <li><Link href="#" className={styles.navLink}>Tenho um espaço</Link></li>
                        <li><Link href="#" className={styles.navLink}>Quero um espaço</Link></li>
                        <li><Link href='https://wa.me/+5511900000000' className={styles.navLink}>Ajuda?</Link></li>
                    </ul>
                </nav>
                </div>
        </header>
    )
}
