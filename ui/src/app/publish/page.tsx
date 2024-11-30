'use client'

import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X } from 'lucide-react'
import PageHeader from '@/components/header/header'
import styles from './PublishPage.module.css'

const PublishPage = () => {
    const [spaceData, setSpaceData] = useState({
        name: '',
        location: '',
        capacity: '',
        pricePerHour: '',
        description: '',
    })
    const [photos, setPhotos] = useState<File[]>([])

    const onDrop = (acceptedFiles: File[]) => {
        setPhotos(prevPhotos => [...prevPhotos, ...acceptedFiles])
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png']
        }
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setSpaceData(prevData => ({ ...prevData, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Here you would typically send the data to your backend
        console.log('Space Data:', spaceData)
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
                <label htmlFor="name">Space Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={spaceData.name}
                    onChange={handleInputChange}
                    required
                />
                </div>
                <div className={styles.formGroup}>
                <label htmlFor="location">Location</label>
                <input
                    type="text"
                    id="location"
                    name="location"
                    value={spaceData.location}
                    onChange={handleInputChange}
                    required
                />
                </div>
                <div className={styles.formGroup}>
                <label htmlFor="capacity">Capacity</label>
                <input
                    type="number"
                    id="capacity"
                    name="capacity"
                    value={spaceData.capacity}
                    onChange={handleInputChange}
                    required
                />
                </div>
                <div className={styles.formGroup}>
                <label htmlFor="pricePerHour">Price per Hour</label>
                <input
                    type="number"
                    id="pricePerHour"
                    name="pricePerHour"
                    value={spaceData.pricePerHour}
                    onChange={handleInputChange}
                    required
                />
                </div>
                <div className={styles.formGroup}>
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={spaceData.description}
                    onChange={handleInputChange}
                    required
                />
                </div>
                <div className={styles.formGroup}>
                <label>Photos</label>
                <div {...getRootProps()} className={styles.dropzone}>
                    <input {...getInputProps()} />
                    {isDragActive ? (
                    <p>Drop the files here ...</p>
                    ) : (
                    <p>Drag 'n' drop some files here, or click to select files</p>
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
                <button type="submit" className={styles.submitButton}>Upload Space</button>
            </form>
            </main>
        </div>
    )
}

export default PublishPage