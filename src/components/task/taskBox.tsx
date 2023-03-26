import { timestampToTimeAgo } from '@/filters/timestampToString'
import { dialogService } from '@/services/dialogService';
import { serverService } from '@/services/serverService';
import styles from '@/styles/components/task/TaskBox.module.css'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import TaskContentArea from './taskContentArea';
interface TaskBoxProps {
    task: any,
    editable: boolean,
    deleteTask: (number: number) => void,
    taskChange: () => void
};

export default function TaskBox(props: TaskBoxProps) {

    const router = useRouter();
    const [task, setTask] = useState(props.task);
    const [content, setContent] = useState(task.body);
    const [title, setTitle] = useState(task.title);
    const [postDisabled, setPostDisabled] = useState(true);
    const status = ['open', 'in progress', 'done'];
    const [lastContent, setLastContent] = useState(task.body);
    const [lastTitle, setLastTitle] = useState(task.title);

    useEffect(() => {
        if (title && content.length >= 30 && (content != lastContent || title != lastTitle))
            setPostDisabled(false);
        else
            setPostDisabled(true);

    }, [content, title, lastContent, lastTitle]);

    const handleChangeStatus = (newStatus: any) => {
        const loading = dialogService.loading();
        serverService.task.updateTask(task.number, { status: newStatus }).then((res) => {
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
    const getTaskLabel = (removeSpace: boolean): string => {
        return task.labels[0] ? task.labels[0].name.replaceAll(removeSpace ? ' ' : '', '') : 'unlabeled';
    }

    const markHighlightText = (text: string): string => {
        const query = router.query.q?.toString();
        if (query) {
            const regex = new RegExp(query, 'gi');
            return text.replaceAll(regex, '<mark>$&</mark>');
        }
        return text;
    }

    const handleContentChange = (content: string) => {
        setContent(content);
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleFooterFunClick = (e: any) => {
        console.log('stop');
        e.stopPropagation();
    }

    const handleCancelPost = (e: any) => {
        e.stopPropagation();

        const clear = () => {
            setTitle(lastTitle);
            setContent(lastContent);
            props.taskChange();
        }

        if (title != lastTitle || content != lastContent)
            dialogService.confirm({
                title: 'Discard Changes',
                message: 'Are you sure you want to discard your changes?',
                confirm: 'Discard',
                cancel: 'Continue editing',
            }).then(() => {
                clear();
            });
        else
            clear();
    }
    const handlePost = (e: any) => {
        e.stopPropagation();

        const loading = dialogService.loading();
        serverService.task.updateTask(task.number, { title: title, content: content }).then((res) => {
            setLastContent(content);
            setLastTitle(title);
            props.taskChange();
        }).catch((err) => {
            dialogService.error(err.message);
        }).finally(() => {
            loading.close();
        });
    }

    const authorInfo = () => {
        return (
            <div className={'d-flex align-items-end justify-content-end ' + styles.author}>
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
                <a onClick={handleFooterFunClick} href={task.user.html_url} title={task.user.login} target="_blank">
                    <img className={styles.avatar} src={task.user.avatar_url} />
                </a>
            </div>
        );
    }
    return (
        <div className={styles.taskBox + (props.editable ? '' : ` ${styles.readOnly}`)}>
            <div className={styles.mainContent}>
                {props.editable ?
                    <input value={title} onChange={handleTitleChange} className={styles.title} placeholder="Title" />
                    :
                    <div className={styles.title} dangerouslySetInnerHTML={{ __html: markHighlightText(title) }} />
                }
                <button onClick={handleFooterFunClick} className={styles.more + " btn btn-secondary dropdown-toggle"} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi bi-three-dots-vertical"></i>
                </button>
                <ul onClick={handleFooterFunClick} className="dropdown-menu dropdown-menu-end">
                    <li>
                        <Link href={'/task/' + task.number} className="dropdown-item">
                            <i className="bi bi-pencil-square"></i>
                            Edit on single page
                        </Link>
                        <button onClick={handleDeleteTask} className="dropdown-item">
                            <i className="bi bi-trash3"></i>
                            Delete
                        </button>
                    </li>
                </ul>
                {props.editable ?
                    <div className={styles.body}>
                        <TaskContentArea editable={props.editable} content={content} contentChange={handleContentChange} />
                        {authorInfo()}
                    </div>
                    :
                    <div className={styles.content} dangerouslySetInnerHTML={{ __html: markHighlightText(content.replaceAll('\n', '<br/>')) }}></div>
                }
            </div>
            <div className={styles.footer}>
                <div>
                    <button onClick={handleFooterFunClick} className={styles[getTaskLabel(true)] + " btn btn-secondary dropdown-toggle " + styles.status} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {getTaskLabel(false)}
                    </button>
                    <ul className={"dropdown-menu " + styles.statusMenu}>
                        {status.map((item, index) => {
                            if (item != getTaskLabel(true)) {
                                return (
                                    <li key={index} onClick={handleFooterFunClick}>
                                        <button onClick={() => { handleChangeStatus(item) }} className={"dropdown-item " + styles.statusItem}>
                                            {item}
                                        </button>
                                    </li>
                                )
                            }
                        })}
                    </ul>
                </div>
                {!props.editable ? authorInfo() :
                    <div className='d-flex'>
                        <button onClick={handleCancelPost} className={"btn btn-outline-secondary " + styles.cancelBtn}>Cancel</button>
                        <button onClick={handlePost} className={"btn btn-primary " + (postDisabled ? "disabled" : "")}>Update</button>
                    </div>
                }
            </div>
        </div >
    )

}