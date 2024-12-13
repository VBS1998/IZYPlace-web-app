'use client'

import { useState } from 'react'
import styles from './AdminPage.module.css'
import { Eye, EyeClosed } from 'lucide-react'

const AdminPage = () => {

    const [pass, setPass] = useState('')
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPass(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        localStorage.setItem('authToken', pass)
        window.location.href = "/admin/requests"
    }

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label className={styles.title} htmlFor="password">Autenticação</label>
                <div className={styles.formGroup}>
                    <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={pass}
                        onChange={handlePasswordChange}
                        placeholder="Digite sua senha"
                        required
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className={styles.showButton}
                    >
                    {showPassword ? <EyeClosed /> : <Eye />}
                    </button>
                </div>
                <button type="submit" className={styles.submitButton}>Entrar</button>
            </form>
        </div>
    )
}

export default AdminPage