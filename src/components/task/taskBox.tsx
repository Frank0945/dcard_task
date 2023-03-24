import { timestampToTimeAgo } from '@/filters/timestampToString'
import { dialogService } from '@/services/dialogService';
import { serverService } from '@/services/serverService';
import styles from '@/styles/components/task/TaskBox.module.css'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function TaskBox(props: { task: any, deleteTask: (number: number) => void }) {

    const router = useRouter();
    const [task, setTask] = useState(props.task);
    const status = ['open', 'in progress', 'done'];

    const handleChangeStatus = (newStatus: any) => {
        const loading = dialogService.loading();
        serverService.task.changeTaskStatus(task.number, newStatus).then((res) => {
            setTask(res);
        }).catch((err) => {
            dialogService.error(err.message);
        }).finally(() => {
            loading.close();
        });
    }

    const handleDeleteTask = () => {
        dialogService.confirm({
            title: 'Delete task',
            message: 'Are you sure you want to delete this task?',
            confirm: 'Delete',
            cancel: 'Cancel',
        }).then(() => {
            const loading = dialogService.loading();
            serverService.task.deleteTask(task.number).then((res) => {
                props.deleteTask(res.number);
            }).catch((err) => {
                dialogService.error(err.message);
            }).finally(() => {
                loading.close();
            });
        });
    }
    const getTaskLabel = (): string => {
        return task.labels[0] ? task.labels[0].name.replaceAll(' ', '') : 'unlabeled';
    }

    const markHighlightText = (text: string): string => {
        const router = useRouter();
        const query = router.query.q?.toString();
        if (query) {
            const regex = new RegExp(query, 'gi');
            return text.replaceAll(regex, '<mark>$&</mark>');
        }
        return text;
    }

    return (
        <div className={styles.taskBox}>
            <div className={styles.mainContent}>
                <div className={styles.title} dangerouslySetInnerHTML={{ __html: markHighlightText(task.title) }} />
                <button className={styles.more + " btn btn-secondary dropdown-toggle"} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi bi-three-dots-vertical"></i>
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                        <button className="dropdown-item">
                            <i className="bi bi-pencil-square"></i>
                            Edit on single page
                        </button>
                        <button onClick={handleDeleteTask} className="dropdown-item">
                            <i className="bi bi-trash3"></i>
                            Delete
                        </button>
                    </li>
                </ul>

                <div className={styles.content} dangerouslySetInnerHTML={{ __html: markHighlightText(task.body.replaceAll('\n', '<br/>')) }}></div>
            </div>
            <div className={styles.footer}>
                <div>
                    <button className={styles[getTaskLabel()] + " btn btn-secondary dropdown-toggle " + styles.status} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {getTaskLabel()}
                    </button>
                    <ul className={"dropdown-menu " + styles.statusMenu}>
                        {status.map((item, index) => {
                            if (item != getTaskLabel()) {
                                return (
                                    <li key={index}>
                                        <button onClick={() => { handleChangeStatus(item) }} className={"dropdown-item " + styles.statusItem}>
                                            {item}
                                        </button>
                                    </li>
                                )
                            }
                        })}
                    </ul>
                </div>
                <div className={'d-flex align-items-end ' + styles.author}>
                    <div className='time'
                        title={
                            "Created at " + timestampToTimeAgo(new Date(task.created_at).getTime()) +
                            "\n (" + new Date(task.created_at).toLocaleString() + ")\n" +
                            "\nUpdated at " + timestampToTimeAgo(new Date(task.updated_at).getTime()) +
                            "\n (" + new Date(task.updated_at).toLocaleString() + ")\n"
                        }
                    >
                        {timestampToTimeAgo(new Date(task.created_at).getTime())}
                    </div>
                    <a href={task.user.html_url} title={task.user.login} target="_blank">
                        <img className={styles.avatar} src={task.user.avatar_url} />
                    </a>
                </div>
            </div>
        </div >
    )

}