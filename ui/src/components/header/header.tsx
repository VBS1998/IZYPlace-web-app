import Image from 'next/image'
import styles from './PageHeader.module.css'
import Link from "next/link"


export default function PageHeader() {

    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <Link href="/" className={styles.logo}>
                    <Image src={"/static/logo-white.png"} layout="fill" objectFit="cover" alt='logo' />
                </Link>
                <nav>
                    <ul className={styles.navList}>
                        <li><Link href="/" className={styles.navLink}>Como Funciona</Link></li>
                        <li><Link href="/publish" className={styles.navLink}>Tenho um espaço</Link></li>
                        <li><Link href="/search" className={styles.navLink}>Quero um espaço</Link></li>
                        <li><Link href='https://wa.me/+5511900000000' className={styles.navLink}>Ajuda?</Link></li>
                    </ul>
                </nav>
                </div>
        </header>
    )
}
