"use client"

import PageHeader from '@/components/header/header';
import styles from './Search.module.css';
import Grid from '@/components/grid/grid';
import { useEffect, useState } from 'react';
import { getListings } from '@/api/requests/listings';
import { Listing } from '@/api/models/listing';
import Footer from '@/components/footer/footer';

export default function SearchResultsPage() {
    const [eventSpaces, setEventSpaces] = useState<Listing[]>([])
    const [queryParams, setQueryParams] = useState<{ [key: string]: string }>({})

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const paramsObject: { [key: string]: string } = {}
        params.forEach((value, key) => {
        paramsObject[key] = value
        })
        setQueryParams(paramsObject)
    }, [])

    useEffect(() => {
        getListings().then((listings) => {
            setEventSpaces(listings)
        })
    }, [])

    return (
        <div className={styles.container}>
            <PageHeader />

            <Grid title={"Resultados da busca" + (queryParams['query'] ? (": " + queryParams['query']) : "")} listingsData={eventSpaces} />

            <Footer />
        </div>
    )
}