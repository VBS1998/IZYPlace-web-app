import { Upload, X } from 'lucide-react'
import styles from './Dropzone.module.css'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { postImage } from '@/api/requests/images';

export interface DropzoneComponentHandle {
    uploadImages: () => Promise<string[]>;
}

interface DropzoneComponentProps {
    onUploadProgress?: (progress: number) => void;
    onPhotosTotalChanged?: (num: number) => void 
}


const DropzoneComponent = forwardRef<DropzoneComponentHandle, DropzoneComponentProps>(({ onUploadProgress, onPhotosTotalChanged }, ref) => {

    const [photos, setPhotos] = useState<File[]>([])
    const [uploading, setUploading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    
    const onDrop = (acceptedFiles: File[]) => {
        setPhotos(prevPhotos => [...prevPhotos, ...acceptedFiles])
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png']
        }
    })

    const removePhoto = (index: number) => {
        setPhotos(prevPhotos => prevPhotos.filter((_, i) => i !== index))
    }

    const uploadImages = async (): Promise<string[]> => {
        if (photos.length === 0) return []

    
        setUploading(true)
        setUploadProgress(0)
    
        const uploadPromises = photos.map(async (photo, index) => {

            const url = postImage(photo)
            
            // Update progress
            const newProgress = Math.round(((index + 1) / photos.length) * 100)
            setUploadProgress(newProgress)
            onUploadProgress?.(newProgress)

            return url
        })
        
        const results = await Promise.all(uploadPromises)
        const successfulUploads = results.filter((url): url is string => url !== null)

        setUploading(false)
        setUploadProgress(100)
        onUploadProgress?.(100)
        setPhotos([])

        return successfulUploads
    }

    // Expose methods via ref
    useImperativeHandle(ref, () => ({
        uploadImages,
    }));

    useEffect(() => {
        onPhotosTotalChanged?.(photos.length)
    }, [photos.length]);

    return (
        <div>
            <div {...getRootProps()} className={styles.dropzone}>
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Solte as imagens aqui.</p>
                ) : (
                    <p>Clique e arraste as imagens para cá. Ou, se preferir, clique para escolher o arquivo.</p>
                )}
                <Upload className={styles.uploadIcon} />
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

        {uploading && (
            <div>
                Uploading. Progress: {uploadProgress}%
            </div>
        )}
        </div>
    )
})

DropzoneComponent.displayName = 'DropzoneComponent'

export default DropzoneComponent