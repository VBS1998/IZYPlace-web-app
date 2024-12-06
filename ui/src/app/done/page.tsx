'use client'

import PageHeader from "@/components/header/header"
import styles from "./DonePage.module.css"
import Link from "next/link"

const DonePage = () => {

    return (
        <div className={styles.container}>
            <PageHeader />
            <div className={styles.main}>
                Seu espaço foi enviado para análise com sucesso! Nossos agentes entrarão em contato em breve pelo telefone providenciado.

                <div><Link href="/" className={styles.button}>Voltar à página principal</Link></div>
            </ div>
        </div>
    )
}

export default DonePage