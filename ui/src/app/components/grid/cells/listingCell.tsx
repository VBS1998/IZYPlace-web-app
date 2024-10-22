import { Listing } from "@/app/api/models/listing";
import { FC } from "react";
import { Star } from "lucide-react"
import Image from "next/image"
import styles from './ListingCell.module.css'

interface ListingCellProps {
    listingData : Listing
}

const ListingCell : FC<ListingCellProps> = (props) => {

    return (
        <div key={props.listingData.id} className={styles.spaceCard}>
            <Image src={props.listingData.imageUrl} alt={props.listingData.name} width={300} height={200} className={styles.spaceImage} />
            <div className={styles.spaceContent}>
                <h3 className={styles.spaceName}>{props.listingData.name}</h3>
                <p className={styles.spaceLocation}>{props.listingData.location}</p>
                <div className={styles.spaceRating}>
                    <Star className={styles.ratingIcon} />
                    <span>
                        <h4 className={styles.ratingText}>
                            {props.listingData.rating.toFixed(1)}
                        </h4>
                    </span>
                </div>
            </div>
        </div>
    )
} 

export default ListingCell