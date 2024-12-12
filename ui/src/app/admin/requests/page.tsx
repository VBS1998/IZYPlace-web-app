'use client'

import Grid from "@/components/grid/grid"
import styles from './AdminRequestsPage.module.css'
import { useEffect, useState } from "react"
import { ListingRequest } from "@/api/models/listingRequest"
import { getRequests } from "@/api/requests/listingRequests"

const AdminRequestsPage = () => {

    const [requests, setRequests] = useState<ListingRequest[]>([])

    useEffect(() => {
        getRequests().then((reqs) => {
            setRequests(reqs)
        })
    }, [])


    return (
        <div className={styles.container}>
            <Grid title="Revisões Pendentes" requestsData={requests}/>
        </div>
    )
}

export default AdminRequestsPage