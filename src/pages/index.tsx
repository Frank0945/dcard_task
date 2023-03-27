import styles from '@/styles/pages/Home.module.css'
import Head from 'next/dist/shared/lib/head'
import PostTask from '@/components/task/postTask'
import TaskList from '@/components/task/taskList'
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { serverService } from '@/services/serverService';

export default function Home() {

  const [reload, setReload] = useState(0);
  const session = useSession();


  const handlePosted = () => {
    setReload(reload + 1);
  };

  return (
    <>
      <Head>
        <title>Task</title>
      </Head>
      <main className={styles.main}>
        {session ? session.data?.accessToken : "no session"}
        {/* <PostTask onPosted={handlePosted} />
        <TaskList reload={reload} /> */}
      </main>
    </>
  )
}
