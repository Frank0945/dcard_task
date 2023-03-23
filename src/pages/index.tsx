import styles from '@/styles/pages/Home.module.css'
import Head from 'next/dist/shared/lib/head'
import PostTask from '@/components/task/postTask'
import TaskList from '@/components/task/taskList'
import { useState } from 'react';

export default function Home() {

  const [reload, setReload] = useState(0);

  const handelPosted = () => {
    setReload(reload + 1);
  };

  return (
    <>
      <Head>
        <title>Task</title>
      </Head>
      <main className={styles.main}>
        <PostTask onPosted={handelPosted} />
        <TaskList reload={reload} />
      </main>
    </>
  )
}
