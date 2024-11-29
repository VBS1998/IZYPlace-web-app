import { Listing } from '@/api/models/listing'
import styles from './Grid.module.css'
import { FC } from 'react'
import ListingCell from '../listingCell/listingCell'

interface GridProps {
    title? : string
    listingsData? : Listing[]
}

const Grid : FC<GridProps> = (props) => {

    const listingsData = props.listingsData ? props.listingsData : []

    return (
        <section className={styles.catalogSection}>
            <div className={styles.catalogContent}>
                <h2 className={styles.catalogTitle}>{props.title ?? ""}</h2>
                <div className={styles.catalogGrid}>
                    {listingsData.map((listing: Listing) => (
                        ListingCell({listingData: listing})
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Grid