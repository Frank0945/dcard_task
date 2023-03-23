import { dialogService } from '@/services/dialogService';
import { serverService } from '@/services/serverService'
import styles from '@/styles/components/task/TaskList.module.css'
import { RefObject, useEffect, useRef, useState } from 'react'
import TaskBox from './taskBox';

export default function TaskList(props: { reload: number }) {

    const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState<any[]>([]);
    const taskListRef: RefObject<HTMLDivElement> = useRef(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const observer = new ResizeObserver(entries => {
            for (const entry of entries) {
                setTasksPosition();
            }
        });
        const current: any = taskListRef.current;
        observer.observe(current);

        return () => {
            observer.unobserve(current);
        };
    }, []);

    useEffect(() => {
        setLoading(true);
        serverService.task.listTasks({ page: page }).then((res) => {
            if (page > 1)
                setTasks(prevTasks => [...prevTasks, ...res]);
            else
                setTasks(res);

            console.log(res);

        }).catch((err) => {
            dialogService.error(err.message);
        }).finally(() => {
            setLoading(false);
        });
    }, [props.reload]);

    useEffect(() => setTasksPosition(), [tasks]);

    const setTasksPosition = () => {
        const taskWidth = 320;
        const gap = 10;
        const current: any = taskListRef.current;
        const containerWidth = current.offsetWidth;
        const children = current.children;
        const row = Math.floor(containerWidth / (taskWidth + gap));
        const rowHeight = new Array(row).fill(0);

        for (let i = 0; i < children.length; i++) {

            const minRowHeight = Math.min(...rowHeight);
            const minRowHeightIndex = rowHeight.indexOf(minRowHeight);

            const left = minRowHeightIndex * (taskWidth + gap);
            const top = minRowHeight + gap
            rowHeight[minRowHeightIndex] += children[i].offsetHeight + gap;

            children[i].style.transform = `translate(${left}px, ${top}px)`;
            setTimeout(() => { children[i].style.opacity = 1; }, 300);

            if (i === children.length - 1)
                current.style.height = `${top + children[i].offsetHeight}px`;
        }
    };

    return (
        <div className={styles.main}>
            <div className={styles.taskList} ref={taskListRef}>
                {tasks.map((task) => {
                    return <TaskBox key={task.id} task={task} />
                })}
                {loading &&
                    <div className={styles.loading}>
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}