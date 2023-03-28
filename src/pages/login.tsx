import Head from 'next/head'
import styles from '@/styles/pages/Login.module.css'
import { signIn } from 'next-auth/react'

export default function Login() {
    const signInWithGithub = (e: any) => {
        e.preventDefault();
        signIn("github");
    }

    return (
        <>
            <Head>
                <title>Login - Task</title>
            </Head>
            <main className={styles.main}>
                <div className={styles.body}>
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
                        <button type="button" className={"btn btn-dark " + styles.loginBtn} onClick={signInWithGithub}>
                            <i className="bi bi-github"></i>Sign in with Github
                        </button>
                    </div>
                </div>
            </main>
        </>
    )
}
