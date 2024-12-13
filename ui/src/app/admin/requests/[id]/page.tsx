'use client'

import { useEffect, useState } from 'react'
import styles from './AdminRequestsDetailsPage.module.css'
import { getRequest } from '@/api/requests/listingRequests'
import { ListingRequest } from '@/api/models/listingRequest'
import ListingDetails from '@/components/listingDetails/listingDetails'
import RequestStatus from '@/api/models/requestStatus'
import { makeCall } from '@/api/requests/admin'
import { User } from 'lucide-react'

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

    const decideCall = (call : boolean) => {
        if (request?.id) {
            makeCall(request.id, call)
        }
        window.location.href = '/admin/requests'
    }

    const onAccept = () => {
        decideCall(true)
    }

    const onReject = () => {
        decideCall(false)
    }


    return (
        <div className={styles.container}>
            <main className={styles.main}>
                { request ? 
                <div>
                    <ListingDetails listing={request.listing} /> 
                    <p className={styles.infoText}><User size={18} />Proprietário: {request.owner.name}, CPF: {request.owner.id}, Telefone: {request.owner.phone}</p>
                </div> :
                <div className={styles.infoText}>Houve um problema com essa request.</div> }

                { request?.status === RequestStatus.Pending ? 
                    <div className={styles.callButtonContainer}>
                        <button className={styles.callButton} onClick={onAccept}>Aprovar</button>
                        <button className={styles.callButton} onClick={onReject}>Recusar</button> 
                    </div> :
                    <div className={styles.infoText}>Essa request se encontra: {request?.status ? RequestStatus[request.status] : "Invalid" }</div>}
            </main>
        </div>
    )
}
