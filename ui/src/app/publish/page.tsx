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
    const [photosTotal, setPhotosTotal] = useState(0)

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
        email: '',
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

    const handlePhotosTotalChanged = (total: number) => {
        setPhotosTotal(total)
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

    const handleCPFInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        var value = e.target.value;
        var cpfPattern = value.replace(/\D/g, '') // Remove qualquer coisa que não seja número
                                .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após o terceiro dígito
                                .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após o sexto dígito
                                .replace(/(\d{3})(\d)/, '$1-$2') // Adiciona traço após o nono dígito
                                .replace(/(-\d{2})\d+?$/, '$1'); // Impede entrada de mais de 11 dígitosc
        e.target.value = cpfPattern;
        setUserData(prevData => ({ ...prevData, ['id']: cpfPattern }))
    }

    const isCPFValid = (cpf : string) => {
        cpf = cpf.replace(/\D+/g, '');
        if (cpf.length !== 11) return false;

        let sum = 0;
        let remainder = 0;
        if (/^(\d)\1{10}$/.test(cpf)) return false; // Verifica sequências iguais

        for (let i = 1; i <= 9; i++) sum += parseInt(cpf.substring(i-1, i)) * (11 - i);
        remainder = (sum * 10) % 11;
        if ((remainder === 10) || (remainder === 11)) remainder = 0;
        if (remainder !== parseInt(cpf.substring(9, 10))) return false;

        sum = 0;
        for (let i = 1; i <= 10; i++) sum += parseInt(cpf.substring(i-1, i)) * (12 - i);
        remainder = (sum * 10) % 11;
        if ((remainder === 10) || (remainder === 11)) remainder = 0;
        if (remainder !== parseInt(cpf.substring(10, 11))) return false;

        return true;
    }

    const handlePhoneNumber = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        var value = e.target.value;
        var cpfPattern = value.replace(/\D/g, '') // Remove qualquer coisa que não seja número
                                .replace(/(\d{2})(\d)/, '\($1\) $2') // Adiciona ponto após o terceiro dígito
                                .replace(/(\d{5})(\d)/, '$1-$2') // Adiciona ponto após o terceiro dígito
        e.target.value = cpfPattern;
        setUserData(prevData => ({ ...prevData, ['phone']: cpfPattern }))
    }

    const isEmailValid = (email : string) => {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    }

    const formsValid = () => {
        return photosTotal >= 4 && isCPFValid(userData.id) && isEmailValid(userData.email)

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
                            onChange={handleCPFInputChange}
                            style={{
                                borderColor: isCPFValid(userData.id) || userData.id == "" ? "initial" : "red",  // Style input on invalid
                            }}
                            required
                        />
                        {!isCPFValid(userData.id) && userData.id != "" && <p style={{ color: "red" }}>CPF Inválido.</p>}
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="PhoneNumber">Telefone {redStar}</label>
                        <input
                            type="text"
                            id="PhoneNumber"
                            name="phone"
                            value={userData.phone}
                            onChange={handlePhoneNumber}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="Email">Email {redStar}</label>
                        <input
                            type="text"
                            id="Email"
                            name="email"
                            value={userData.email}
                            onChange={handleUserInputChange}
                            style={{
                                borderColor: isEmailValid(userData.email) || userData.email == "" ? "initial" : "red",  // Style input on invalid
                            }}
                            required
                        />
                        {!isEmailValid(userData.email) && userData.email != "" && <p style={{ color: "red" }}>Email Inválido.</p>}
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
                        <label>Fotos (ao menos quatro) {redStar}</label>
                        <DropzoneComponent ref={DropzoneComponentRef} onUploadProgress={handleUploadProgress} onPhotosTotalChanged={handlePhotosTotalChanged}/>
                    </div>
                    {uploadProgress != 0 ? <>{uploadProgress}</> : <></>}
                    <button type="submit" className={styles.submitButton} disabled={!formsValid()}>Adicionar Local</button>
                </form>
            </main>
        </div>
    )
}

export default PublishPage