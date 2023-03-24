import { dialogService } from '@/services/dialogService';
import { serverService } from '@/services/serverService'
import styles from '@/styles/components/task/TaskList.module.css'
import { IListTask } from '@/types/taskTypes';
import { useRouter } from 'next/router';
import { RefObject, useEffect, useRef, useState } from 'react'
import TaskBox from './taskBox';

export default function TaskList(props: { reload: number }) {

    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState<any[]>([]);
    const taskListRef: RefObject<HTMLDivElement> = useRef(null);
    const [page, setPage] = useState(1);
    const [isMaxPage, setIsMaxPage] = useState(false);
    const statusList = ['all', 'open', 'in progress', 'done'];

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
        const handleScroll = () => {
            const scrollTop = document.documentElement.scrollTop;
            const unShown = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            if (scrollTop >= unShown - 10 && !loading && !isMaxPage) {
                setPage(prevPage => prevPage + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [loading, isMaxPage]);

    useEffect(() => {
        setTasks([]);
        setPage(1);

        const query = router.query;
        const order = getOrder();
        const label = getStatus() == statusList[0] ? '' : getStatus();

        const data: any = {
            page: 1,
            order: order,
            label: label,
            q: query.q
        };

        listTasks(data, true);

    }, [props.reload, router.query.status, router.query.order, router.query.q]);

    useEffect(() => {
        if (page == 1 || loading || isMaxPage)
            return;

        const data: any = {
            page: page,
            order: getOrder(),
            label: getStatus() == statusList[0] ? '' : getStatus(),
            q: router.query.q
        };

        listTasks(data, false);
    }, [page]);

    const listTasks = (data: IListTask, isReload: boolean) => {

        setLoading(true);
        serverService.task.listTasks(data).then((res) => {
            console.log(res.items);

            if (!isReload)
                setTasks(prevTasks => [...prevTasks, ...res.items]);
            else
                setTasks(res.items);

            setIsMaxPage(res.items.length < 10);

        }).catch((err) => {
            dialogService.error(err.message);
        }).finally(() => {
            setLoading(false);
        });
    }

    useEffect(() => setTasksPosition(), [tasks]);

    const getOrder = (): string => {
        const queryParams = new URLSearchParams(location.search);
        const order = queryParams.get('order');
        if (!order) return 'desc';
        return order;
    }

    const getStatus = (): string => {
        const queryParams = new URLSearchParams(location.search);
        const status = queryParams.get('status');
        if (!status) return statusList[0];
        return status;
    }

    const setTasksPosition = () => {
        const taskWidth = 310;
        const gap = 15;
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
            children[i].style.zIndex = `${children.length - i}`;

            if (!children[i].style.opacity)
                setTimeout(() => {
                    if (children[i])
                        children[i].style.opacity = '1';
                }, 300);

            if (i === children.length - 1)
                current.style.height = `${Math.max(...rowHeight)}px`;
        }
    };

    const handleChangeStatus = (status: string) => () => {
        const queryParams = new URLSearchParams(location.search);
        queryParams.set('status', status);

        if (status == statusList[0])
            queryParams.delete('status');

        router.push('?' + queryParams.toString());
    }

    const handleChangeSort = () => {
        const queryParams = new URLSearchParams(location.search);
        const order = getOrder();
        queryParams.set('order', order == 'desc' ? 'asc' : 'desc');
        router.push('?' + queryParams.toString());
    }

    const handleDeleteTask = (number: number) => {
        setTasks(prevTasks => prevTasks.filter(task => task.number != number));
    }

    return (
        <div className={styles.main}>
            <div className={styles.tabs}>
                <div className={styles.tab}>
                    <button className={"btn btn-secondary dropdown-toggle " + styles.tabBtn} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="bi bi-funnel"></i>
                        <span>{getStatus()}</span>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                        {statusList.map((item, index) => {
                            if (item != getStatus()) {
                                return (
                                    <button className="dropdown-item" key={index} onClick={handleChangeStatus(item)}>
                                        {item}
                                    </button>
                                )
                            }
                        })}
                    </ul>
                </div>
                <div className={styles.tab}>
                    <button className={"btn btn-secondary " + styles.tabBtn} onClick={handleChangeSort} type="button" aria-expanded="false">
                        {getOrder() == 'desc' ?
                            <i className="bi bi-arrow-up"></i>
                            :
                            <i className="bi bi-arrow-down"></i>
                        }
                        <span>{getOrder() == 'desc' ? 'newest' : 'oldest'}</span>
                    </button>
                </div>
            </div>

            <div className={styles.taskList} ref={taskListRef}>
                {tasks.map((task, idx) => {
                    return <TaskBox key={task.id} task={task} deleteTask={(number) => handleDeleteTask(number)} />
                })}
                <div className={styles.loading}>
                    {loading &&
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}