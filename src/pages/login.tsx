import Head from 'next/head'
import styles from '@/styles/pages/Login.module.css'

export default function Login() {
    return (
        <>
            <Head>
                <title>Task - Login</title>
            </Head>
            <main className={styles.main}>
                <div className={styles.taskBlock}>
                    <img
                        className={styles.logo}
                        src="/task_logo.svg"
                    />
                </div>
                <div className={styles.loginBlock}>
                    <div>
                        <div className={styles.title}>Nice to meet you!</div>
                        <div className={styles.subtitle}>You must be logged in to access this service.</div>
                    </div>
                    <button type="button" className={"btn btn-dark " + styles.loginBtn}>
                        <img src='/github.svg' width={30} />Sign in with Github
                    </button>
                </div>
            </main>
        </>
    )
}
