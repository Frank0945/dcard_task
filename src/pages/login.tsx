import Head from 'next/head'
import styles from '@/styles/pages/Login.module.css'
import { serverService } from '@/services/serverService'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function Login() {
    const { data: session } = useSession();
    const router = useRouter();

    if (session)
        router.replace('/');

    if (useSession().status == "unauthenticated")
        return (
            <>
                <Head>
                    <title>Login - Task</title>
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
                        <button type="button" className={"btn btn-dark " + styles.loginBtn} onClick={() => signIn("github")}>
                            <img src='/github.svg' width={30} />Sign in with Github
                        </button>
                    </div>
                </main>
            </>
        )
}
