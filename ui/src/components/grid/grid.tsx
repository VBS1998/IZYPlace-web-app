import { Listing } from '@/api/models/listing'
import styles from './Grid.module.css'
import { FC } from 'react'
import ListingCell from '../listingCell/listingCell'
import { ListingRequest } from '@/api/models/listingRequest'

interface GridProps {
    title? : string
    listingsData? : Listing[]
    requestsData? : ListingRequest[]
}

const Grid : FC<GridProps> = (props) => {

    const listingsData = props.listingsData ? props.listingsData : []
    const requestsData = props.requestsData ? props.requestsData : []

    return (
        <section className={styles.catalogSection}>
            <div className={styles.catalogContent}>
                <h2 className={styles.catalogTitle}>{props.title ?? ""}</h2>
                <div className={styles.catalogGrid}>
                    {listingsData.map((listing: Listing) => (
                        <ListingCell key={listing.id} listingData={listing}/>
                    ))}
                    {requestsData.map((request: ListingRequest) => (
                        <ListingCell key={request.id} listingData={request.listing} href={'/admin/requests/' + request.id}/>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Grid