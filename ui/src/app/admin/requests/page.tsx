'use client'

import Grid from "@/components/grid/grid"
import styles from './AdminRequestsPage.module.css'
import { useEffect, useState } from "react"
import { ListingRequest } from "@/api/models/listingRequest"
import { getRequests, getRequestsWithStatus } from "@/api/requests/listingRequests"
import { Field, Label, RadioGroup, Radio} from "@headlessui/react"

const AdminRequestsPage = () => {

    const plans = [ 'Todos', 'Pendentes', 'Aceitos', 'Recusados']

    const [requests, setRequests] = useState<ListingRequest[]>([])
    const [selected, setSelected] = useState(plans[1])

    useEffect(() => {
        const index = plans.findIndex(plan => plan === selected)
        if(index > 0) {
            getRequestsWithStatus(index).then(reqs => {
                setRequests(reqs)
            })
        } else {
            getRequests().then((reqs) => {
                setRequests(reqs)
            })
        }
    }, [selected])


    return (
        <div className={styles.container}>
            <h2 className={styles.pageTitle}>Revisões: {selected}</h2>
            <RadioGroup value={selected} onChange={setSelected} aria-label="status" className={styles.radioGroup}>
                {plans.map((plan) => (
                    <Field key={plan} className={styles.field}>
                        <Radio value={plan} className={styles.radio} style={plan === selected ? {background: '#0C314C'} : {}}/>
                        <Label className={styles.radioLabel}>{plan}</Label>
                    </Field>
                ))}
            </RadioGroup>
            <Grid requestsData={requests}/>
        </div>
    )
}

export default AdminRequestsPage