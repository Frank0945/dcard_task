import { dialogService } from '@/services/dialogService';
import { serverService } from '@/services/serverService';
import styles from '@/styles/components/task/PostTask.module.css'
import { useEffect, useRef, useState } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';

export default function PostTask(props: { onPosted: () => void }) {

    const [focus, setFocus] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [postDisabled, setPostDisabled] = useState(true);
    const contentRef = useRef<HTMLTextAreaElement>(null);

    const handelCancelFocus = () => {
        if (!title && !content)
            setFocus(false);
    };
    const mainRef = useDetectClickOutside({ onTriggered: handelCancelFocus });

    useEffect(() => {
    }, []);

    useEffect(() => {
        if (title && content.length >= 30)
            setPostDisabled(false);
        else
            setPostDisabled(true);

    }, [content, title]);

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        contentRef.current!.style.height = '0';
        contentRef.current!.style.height = e.target.scrollHeight + 'px';
        setContent(e.target.value);
        setFocus(true);
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const clearAllInput = () => {
        setTitle('');
        setContent('');
        contentRef.current!.value = '';
        setFocus(false);
    };

    const handelCancelPost = () => {
        if (title || content) {
            dialogService.confirm({
                title: "The site doesn't keep your unpublished task",
                message: "",
                confirm: "Ok",
                cancel: "Cancel"
            }).then(() => {
                clearAllInput();
            });
        } else
            clearAllInput();
    };

    const handelPost = () => {
        const loading = dialogService.loading();

        serverService.task.postTask(title, content).then((res) => {
            clearAllInput();
            console.log('posted');
            console.log(res);
            props.onPosted();

        }).catch((err) => {
            dialogService.error(err.message);
        }).finally(() => {
            loading.close();
        });
    };

    return (
        <div className={styles.main} ref={mainRef}>

            {focus &&
                <input value={title} onChange={handleTitleChange} placeholder="Title" className={styles.title} />
            }

            <div className={styles.body}>
                <textarea
                    ref={contentRef}
                    onClick={() => setFocus(true)}
                    onChange={handleContentChange}
                    placeholder="Add Task..."
                    className={styles.content}
                    rows={1}
                />
            </div>
            {focus &&
                <div className={styles.footer}>
                    <button onClick={handelCancelPost} className={"btn btn-outline-secondary " + styles.cancelBtn}>Cancel</button>
                    <button onClick={handelPost} className={"btn btn-primary " + (postDisabled ? "disabled" : "")}>Post</button>
                </div>
            }
        </div>
    )
}