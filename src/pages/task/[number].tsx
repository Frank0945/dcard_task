
import Head from 'next/head';
import { useRouter } from 'next/router'
import styles from '@/styles/pages/task/TaskPage.module.css'
import { useEffect, useState } from 'react';
import { serverService } from '@/services/serverService';
import TaskBox from '@/components/task/taskBox';
import { dialogService } from '@/services/dialogService';

export default function TaskPage() {
    const router = useRouter();
    const taskNumber = Number(router.query.number);
    const [loading, setLoading] = useState(true);
    const [task, setTask] = useState<any>(null);

    useEffect(() => {
        if (taskNumber)
            serverService.task.getTask(taskNumber).then((res) => {
                setTask(res);
            }).catch((err) => {
                dialogService.error(err.message);
            }).finally(() => {
                setLoading(false);
            });
    }, [])

    const handleDeleteTask = (number: number) => {
        router.push('/');
    }

    const handleTaskChange = () => {
        router.push('/');
    }

    return (
        <>
            <Head>
                <title>{task ? task.title + ' -' : ''}Task</title>
            </Head>
            <main className={styles.main}>
                {task &&
                    <div className={styles.taskBox}>
                        <TaskBox
                            task={task}
                            editable={true}
                            deleteTask={handleDeleteTask}
                            taskChange={handleTaskChange}
                        />
                    </div>
                }
                {loading &&
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                }
            </main>
        </>
    )
}
