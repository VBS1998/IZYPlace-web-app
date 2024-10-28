import { Listing } from "@/app/api/models/listing";
import { FC } from "react";
import { Star } from "lucide-react"
import Image from "next/image"
import styles from './ListingCell.module.css'
import Link from "next/link";

interface ListingCellProps {
    listingData : Listing
}

const ListingCell: FC<ListingCellProps> = ({ listingData }: { listingData: Listing }) => {

    return (
        <Link href={`/listingDetails/${listingData.id}`} className={styles.spaceCard}>
            <Image src={listingData.imageUrl} alt={listingData.name} width={300} height={200} className={styles.spaceImage} />
            <div className={styles.spaceContent}>
                <h3 className={styles.spaceName}>{listingData.name}</h3>
                <p className={styles.spaceLocation}>{listingData.location}</p>
                <div className={styles.spaceRating}>
                    <Star className={styles.ratingIcon} />
                    <span>
                        <h4 className={styles.ratingText}>
                            {listingData.rating.toFixed(1)}
                        </h4>
                    </span>
                </div>
            </div>
        </Link>
    )
} 

export default ListingCell