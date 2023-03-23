import { timestampToTimeAgo } from '@/filters/timestampToString'
import styles from '@/styles/components/task/TaskBox.module.css'

export default function TaskBox(props: { task: any }) {

    const status = ['open', 'in progress', 'done'];

    return (
        <div className={styles.taskBox}>
            <div className={styles.mainContent}>
                <div className={styles.title}>{props.task.title}</div>
                <div className={styles.content} dangerouslySetInnerHTML={{ __html: props.task.body.replaceAll('\n', '<br/>') }}></div>
            </div>
            <div className={styles.footer}>
                <div className="dropdown-center">
                    <button className={styles[props.task.labels[0].name] + " btn btn-secondary dropdown-toggle " + styles.status} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {props.task.labels[0].name}
                    </button>
                    <ul className="dropdown-menu">
                        {status.map((item, index) => {
                            if (item != props.task.labels[0].name) {
                                return (
                                    <li key={index}>
                                        <a className={"dropdown-item " + styles.statusItem}>
                                            {item}
                                        </a>
                                    </li>
                                )
                            }
                        })}
                    </ul>
                </div>
                <div className={'d-flex align-items-end ' + styles.author}>
                    <div className='time'>{timestampToTimeAgo(new Date(props.task.updated_at).getTime())}</div>
                    <a href={props.task.user.html_url} title={props.task.user.login} target="_blank">
                        <img className={styles.avatar} src={props.task.user.avatar_url} />
                    </a>
                </div>
            </div>
        </div >
    )

}