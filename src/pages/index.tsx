import styles from '@/styles/pages/Home.module.css'
import Head from 'next/dist/shared/lib/head'
import PostTask from '@/components/postTask'

export default function Home() {
  return (
    <>
      <Head>
        <title>Task</title>
      </Head>
      <main className={styles.main}>
        <PostTask />
      </main>
    </>
  )
}
