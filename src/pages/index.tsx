import styles from '@/styles/pages/Home.module.css'
import Navbar from '../components/navbar'
import Head from 'next/dist/shared/lib/head'
import { serverService } from '@/services/serverService'
import { useEffect, useState } from 'react'

export default function Home() {

  const [loading, setLoading] = useState(true);

  serverService.init().then(() => {
    setLoading(false);
  });

  if (!loading)
    return (
      <>
        <Head>
          <title>Task</title>
        </Head>
        <main className={styles.main}>
          <Navbar />
        </main>
      </>
    )

}
