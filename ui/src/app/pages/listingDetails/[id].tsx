"use client"
import { MapPin, Star, Users, DollarSign } from "lucide-react"
import Image from "next/image"
import styles from './ListingDetails.module.css'
import PageHeader from "@/app/components/header/header"
import Footer from "@/app/components/footer/footer"
import { useEffect, useState } from "react"
import { getListings } from "@/app/api/requests/listings"
import { Listing } from "@/app/api/models/listing"
import { useRouter } from "next/router"

interface SpaceDetails {
    id: number
    name: string
    location: string
    rating: number
    image: string
    description: string
    capacity: number
    pricePerHour: number
    amenities: string[]
}

export default function ListingDetails() {

    const listing : SpaceDetails = {
        id: 1, 
        name: "",
        location: "",
        rating: 0,
        image: "",
        description: "",
        capacity: 0,
        pricePerHour: 0,
        amenities: []
    }
    const router = useRouter();
    const { id } = router.query;

    const [listingg, setListing] = useState<Listing>()

    useEffect(() => {
        if(id){
            getListings().then((listings) => {
                setListing(listings[0])
            })
        }
    }, [id])

    useEffect(() => {
        console.log(id, listingg)
    }, [id, listingg])

    return (
        <div className={styles.container}>
            <PageHeader />

            <main className={styles.main}>
                <div className={styles.imageContainer}>
                    <Image src={listing.image} alt={listing.name} layout="fill" objectFit="cover" className={styles.image} />
                </div>
                <div className={styles.content}>
                    <h1 className={styles.title}>{listing.name}</h1>
                    <div className={styles.locationRating}>
                        <p className={styles.location}><MapPin size={18} /> {listing.location}</p>
                        <p className={styles.rating}><Star size={18} /> {listing.rating.toFixed(1)}</p>
                    </div>
                    <p className={styles.description}>{listing.description}</p>
                    <div className={styles.details}>
                        <div className={styles.detailItem}>
                            <Users size={18} />
                            <span>Capacity: {listing.capacity} people</span>
                        </div>
                        <div className={styles.detailItem}>
                            <DollarSign size={18} />
                            <span>Price: ${listing.pricePerHour}/hour</span>
                        </div>
                    </div>
                    <h2 className={styles.amenitiesTitle}>Amenities</h2>
                    <ul className={styles.amenitiesList}>
                        {listing.amenities.map((amenity, index) => (
                            <li key={index} className={styles.amenityItem}>{amenity}</li>
                        ))}
                    </ul>
                    <button className={styles.bookButton}>Book Now</button>
                </div>
            </main>

            <Footer />
        </div>
    )
}