'use client'

import { useRef, useState } from 'react'
import PageHeader from '@/components/header/header'
import styles from './PublishPage.module.css'
import { addRequest } from '@/api/requests/listingRequests'
import { ListingRequest } from '@/api/models/listingRequest'
import DropzoneComponent, { DropzoneComponentHandle } from '@/components/dropzone/dropzone'

const PublishPage = () => {
    const DropzoneComponentRef = useRef<DropzoneComponentHandle>(null)
    const [uploadProgress, setUploadProgress] = useState(0)

    const [listingData, setListingData] = useState({
        name: '',
        location: '',
        capacity: '',
        pricePerHour: '',
        description: '',
    })

    const [userData, setUserData] = useState({
        name: '',
        id: '',
        phone: '',
    })

    const handleImageUpload = async () => {
        if (DropzoneComponentRef.current) {
            const urls = await DropzoneComponentRef.current.uploadImages()
            return urls
        }
    }
    
    const handleUploadProgress = (progress: number) => {
        setUploadProgress(progress)
    }

    const redStar = (<label style={{color: "red"}}>*</ label>)
    
    const handleSpaceInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setListingData(prevData => ({ ...prevData, [name]: value }))
    }
    
    const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setUserData(prevData => ({ ...prevData, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        const urls = await handleImageUpload()
        const listing = {
            ...listingData, 
            capacity: parseFloat(listingData.capacity),
            pricePerHour: parseFloat(listingData.pricePerHour),
            imageUrl: urls ?? []
        }
        const request : ListingRequest = {owner: userData, listing: listing}
        await addRequest(request)
        window.location.href = "/done"
    }

    return (
        <div className={styles.container}>
            <PageHeader />
            <main className={styles.main}>
            <h1 className={styles.title}>Criar anúncio</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="OwnerName">Nome do Proprietário {redStar}</label>
                    <input
                        type="text"
                        id="OwnerName"
                        name="name"
                        value={userData.name}
                        onChange={handleUserInputChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="OwnerId">CPF {redStar}</label>
                    <input
                        type="text"
                        id="OwnerId"
                        name="id"
                        value={userData.id}
                        onChange={handleUserInputChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="PhoneNumber">Telefone {redStar}</label>
                    <input
                        type="text"
                        id="PhoneNumber"
                        name="phone"
                        value={userData.phone}
                        onChange={handleUserInputChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="SpaceName">Nome do Anúncio {redStar}</label>
                    <input
                        type="text"
                        id="spaceName"
                        name="name"
                        value={listingData.name}
                        onChange={handleSpaceInputChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="location">Localização {redStar}</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={listingData.location}
                        onChange={handleSpaceInputChange}
                        required
                    />
                </div>
                <div style={{ display: "flex", gap: "1rem"  }}>
                    <div className={styles.formGroup} style={{flexGrow: "1"}}>
                        <label htmlFor="capacity">Capacidade {redStar}</label>
                        <input
                            type="number"
                            id="capacity"
                            name="capacity"
                            value={listingData.capacity}
                            onChange={handleSpaceInputChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup} style={{flexGrow: "1"}}>
                        <label htmlFor="pricePerHour">Preço por Hora {redStar}</label>
                        <input
                            type="number"
                            id="pricePerHour"
                            name="pricePerHour"
                            value={listingData.pricePerHour}
                            onChange={handleSpaceInputChange}
                            required
                        />
                    </div>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="description">Descrição {redStar}</label>
                    <textarea
                        id="description"
                        name="description"
                        value={listingData.description}
                        onChange={handleSpaceInputChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Photos {redStar}</label>
                    <DropzoneComponent ref={DropzoneComponentRef} onUploadProgress={handleUploadProgress}/>
                </div>
                <button type="submit" className={styles.submitButton}>Adicionar Local</button>
            </form>
            </main>
        </div>
    )
}

export default PublishPage