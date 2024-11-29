"use client"

import PageHeader from '@/components/header/header';
import styles from './Search.module.css';
import Grid from '@/components/grid/grid';
import { useEffect, useState } from 'react';
import { getListings } from '@/api/requests/listings';
import { Listing } from '@/api/models/listing';

export default function SearchResultsPage() {
    const [eventSpaces, setEventSpaces] = useState<Listing[]>([])

    useEffect(() => {
        getListings().then((listings) => {
            setEventSpaces(listings)
        })
    }, [])

    return (
        <div className={styles.container}>
            <PageHeader />

            <Grid title="Resultados da busca" listingsData={eventSpaces} />
        </div>
    )
}