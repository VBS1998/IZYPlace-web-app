"use client"

import styles from './ListingDetails.module.css'
import PageHeader from "@/components/header/header"
import Footer from "@/components/footer/footer"
import { useEffect, useState } from "react"
import { getListing } from "@/api/requests/listings"
import { Listing } from "@/api/models/listing"
import ListingDetails from "@/components/listingDetails/listingDetails"

export default function ListingDetailsPage({ params }: {params: Promise<{ id: string}>}) {

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
                <ListingDetails listing={listing}/>
                <button onClick={onBookNow} className={styles.bookButton}>Reservar</button>
            </main>

            <Footer />
        </div>
    )
}
