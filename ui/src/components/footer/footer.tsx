import styles from './Footer.module.css'

export default function Footer(){

    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                &copy; {new Date().getFullYear()} IZYPlace. All rights reserved.
            </div>
        </footer>
    )
}