import { Listing } from "@/api/models/listing";
import { FC } from "react";
import { Users } from "lucide-react"
import Image from "next/image"
import styles from './ListingCell.module.css'
import Link from "next/link";

interface ListingCellProps {
    listingData : Listing
}

const ListingCell: FC<ListingCellProps> = ({ listingData }: { listingData: Listing }) => {

    return (
        <Link key={listingData.id} href={`/listingDetails/${listingData.id}`} className={styles.spaceCard}>
            <Image src={listingData.imageUrl[0]} alt={listingData.name} width={300} height={200} className={styles.spaceImage} />
            <div className={styles.spaceContent}>
                <h3 className={styles.spaceName}>{listingData.name}</h3>
                <p className={styles.spaceLocation}>{listingData.location}</p>
                <div className={styles.spaceCapacity}>
                    <Users className={styles.capacityIcon} />
                    <span>
                        <h4 className={styles.capacityText}>
                            {listingData.capacity}
                        </h4>
                    </span>
                </div>
            </div>
        </Link>
    )
} 

export default ListingCell