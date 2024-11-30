"use client"
import { MapPin, Star, Users, DollarSign } from "lucide-react"
import Image from "next/image"
import styles from './ListingDetails.module.css'
import PageHeader from "@/components/header/header"
import Footer from "@/components/footer/footer"
import { useEffect, useState } from "react"
import { getListing } from "@/api/requests/listings"
import { Listing } from "@/api/models/listing"
import Carousel from "@/components/carousel/carousel"

export default function ListingDetails({ params }: {params: Promise<{ id: string}>}) {

    const [listing, setListing] = useState<Listing>()
    const [id, setId] = useState<string>("")

    const onBookNow = () => {
        window.location.href = 'https://wa.me/+5511900000000';
    }

    useEffect(() => {
        params.then((p : {id : string}) => setId(p.id))
    })

    useEffect(() => {
        if(id){
            getListing(id).then((listing) => {
                setListing(listing)
            })
        }
    }, [id])

    if(!listing) {
        return <>...Loading</>
    }

    return (
        <div className={styles.container}>
            <PageHeader />

            <main className={styles.main}>
                <div className={styles.imageContainer}>
                    <Carousel singleCell imagesData={listing.imageUrl} />
                </div>
                <div className={styles.content}>
                    <h1 className={styles.title}>{listing.name}</h1>
                    <div className={styles.locationRating}>
                        <p className={styles.location}><MapPin size={18} /> {listing.location}</p>
                        <p className={styles.rating}><Star size={18} /> {listing.rating}</p>
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
                    
                    <button onClick={onBookNow} className={styles.bookButton}>Book Now</button>
                </div>
            </main>

            <Footer />
        </div>
    )
}
