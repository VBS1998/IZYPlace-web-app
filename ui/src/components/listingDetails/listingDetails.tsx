import { Listing } from "@/api/models/listing"
import { FC } from "react"
import Carousel from "../carousel/carousel"
import styles from './ListingDetails.module.css'
import { DollarSign, MapPin, Users } from "lucide-react"

interface ListingDetailsProps {
    listing : Listing
}

const ListingDetails: FC<ListingDetailsProps> = ({ listing } : { listing: Listing }) => {


    return (
        <div>
            <div className={styles.imageContainer}>
                <Carousel singleCell imagesData={listing.imageUrl} />
            </div>
            <div className={styles.content}>
                <h1 className={styles.title}>{listing.name}</h1>
                <div className={styles.locationCapacity}>
                    <p className={styles.location}><MapPin size={18} /> {listing.location}</p>
                    <p className={styles.capacity}><Users size={18} />Capacidade: {listing.capacity} pessoas</p>
                </div>
                <p className={styles.description}>{listing.description}</p>
                <div className={styles.details}>
                    <div className={styles.detailItem}>
                        <DollarSign size={18} />
                        <span>Preço: R${listing.pricePerHour}/hora</span>
                    </div>
                </div>
            </div>
        </div>
    )
} 

export default ListingDetails