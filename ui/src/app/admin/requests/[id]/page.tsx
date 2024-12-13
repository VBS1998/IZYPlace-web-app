'use client'

import { useEffect, useState } from 'react'
import styles from './AdminRequestsDetailsPage.module.css'
import { getRequest } from '@/api/requests/listingRequests'
import { ListingRequest } from '@/api/models/listingRequest'
import ListingDetails from '@/components/listingDetails/listingDetails'
import RequestStatus from '@/api/models/requestStatus'

export default function AdminRequestsDetailsPage({ params }: {params: Promise<{ id: string}>}) {

    const [request, setRequest] = useState<ListingRequest>()
    const [id, setId] = useState<string>("")

    useEffect(() => {
        params.then((p : {id : string}) => setId(p.id))
    })

    useEffect(() => {
        if(id != ''){
            getRequest(id).then(setRequest)
        }
    }, [id])

    const makeCall = (call : boolean) => {
        console.log(call)
    }

    const onAccept = () => {
        makeCall(true)
    }

    const onReject = () => {
        makeCall(false)
    }


    return (
        <div className={styles.container}>
            <main className={styles.main}>
                { request ? <ListingDetails listing={request.listing} /> : <div>Houve um problema com essa request.</div> }
                { request?.status === RequestStatus.Pending ? 
                    <div className={styles.callButtonContainer}>
                        <button className={styles.callButton} onClick={onAccept}>Aprovar</button>
                        <button className={styles.callButton} onClick={onReject}>Recusar</button> 
                    </div> :
                    <div>Essa request se encontra {request?.status}</div>}
            </main>
        </div>
    )
}
