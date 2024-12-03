'use client'

import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X } from 'lucide-react'
import PageHeader from '@/components/header/header'
import styles from './PublishPage.module.css'
import { addRequest } from '@/api/requests/listingRequests'
import { ListingRequest } from '@/api/models/listingRequest'
import { imagesUrl } from '@/api/axios'

const PublishPage = () => {
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

    const [photos, setPhotos] = useState<File[]>([])

    const redStar = (<label style={{color: "red"}}>*</ label>)
    
    const onDrop = (acceptedFiles: File[]) => {
        setPhotos(prevPhotos => [...prevPhotos, ...acceptedFiles])
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png']
        }
    })

    const handleSpaceInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setListingData(prevData => ({ ...prevData, [name]: value }))
    }
    
    const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setUserData(prevData => ({ ...prevData, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const listing = {
            ...listingData, 
            capacity: parseFloat(listingData.capacity),
            pricePerHour: parseFloat(listingData.pricePerHour),
            imageUrl: [] //TODO: Handle images
        }
        const request : ListingRequest = {owner: userData, listing: listing}
        addRequest(request)
        console.log('Photos:', photos)
    }

    const removePhoto = (index: number) => {
        setPhotos(prevPhotos => prevPhotos.filter((_, i) => i !== index))
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
                    <div {...getRootProps()} className={styles.dropzone}>
                        <input {...getInputProps()} />
                        {isDragActive ? (
                        <p>Solte as imagens aqui.</p>
                        ) : (
                        <p>Clique e arraste as imagens para cá. Ou, se preferir, clique para escolher o arquivo.</p>
                        )}
                        <Upload className={styles.uploadIcon} />
                    </div>
                </div>
                {photos.length > 0 && (
                <div className={styles.photoPreview}>
                    {photos.map((photo, index) => (
                    <div key={index} className={styles.photoItem}>
                        <img src={URL.createObjectURL(photo)} alt={`Uploaded photo ${index + 1}`} />
                        <button type="button" onClick={() => removePhoto(index)} className={styles.removePhoto}>
                        <X size={16} className={styles.xButton} />
                        </button>
                    </div>
                    ))}
                </div>
                )}
                <button type="submit" className={styles.submitButton}>Adicionar Local</button>
            </form>
            </main>
        </div>
    )
}

export default PublishPage