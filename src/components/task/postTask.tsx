import { dialogService } from '@/services/dialogService';
import { serverService } from '@/services/serverService';
import styles from '@/styles/components/task/PostTask.module.css'
import { useEffect, useRef, useState } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';
import TaskContentArea from './taskContentArea';

export default function PostTask(props: { onPosted: () => void }) {

    const [focus, setFocus] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [postDisabled, setPostDisabled] = useState(true);
    const contentPlaceHolderRef = useRef<HTMLDivElement>(null);
    const placeHolders: string[] = [
        "Add task...",
        "Complete annual report, submit by Friday",
        "Buy pizza ingredients for weekend",
        "Confirm order delivery time",
        "Respond to customer email",
        "Organize office files"
    ];
    const [contentPlaceHolder, setContentPlaceHolder] = useState(placeHolders[0]);

    useEffect(() => {
        if (title && content.length >= 30)
            setPostDisabled(false);
        else
            setPostDisabled(true);

    }, [content, title]);

    const choosePlaceHolder = () => {
        let idx = placeHolders.indexOf(contentPlaceHolderRef.current?.innerText as string) + 1;
        idx = idx >= placeHolders.length ? 0 : idx;
        setContentPlaceHolder(placeHolders[idx]);
        contentPlaceHolderRef.current!.style.animationName = 'typing';
    }

    useEffect(() => {
        if (!content && !focus) {
            contentPlaceHolderRef.current?.addEventListener('animationiteration', choosePlaceHolder);
        } else {
            setContentPlaceHolder(placeHolders[0]);
            contentPlaceHolderRef.current?.removeEventListener('animationiteration', choosePlaceHolder);
            contentPlaceHolderRef.current!.style.animationName = '';
        }

        return () => {
            contentPlaceHolderRef.current?.removeEventListener('animationiteration', choosePlaceHolder);
        };
    }, [content, focus]);

    const handleCancelFocus = () => {
        if (!title && !content)
            setFocus(false);
    };
    const mainRef = useDetectClickOutside({ onTriggered: handleCancelFocus });


    const handleContentChange = (content: string) => {
        setContent(content);
        setFocus(true);
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const clearAllInput = () => {
        setTitle('');
        setContent('');
        setFocus(false);
    };

    const handleCancelPost = () => {
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

    const handlePost = () => {
        const loading = dialogService.loading();

        serverService.task.postTask(title, content).then((res) => {
            clearAllInput();
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
                <div
                    className={'d-flex flex-fill ' + styles.content}
                    onClick={() => setFocus(true)}
                >
                    <TaskContentArea
                        editable={true}
                        content={content}
                        contentChange={handleContentChange}
                    />
                </div>
                <div ref={contentPlaceHolderRef} className={styles.contentPlaceHolder}>
                    {!content &&
                        contentPlaceHolder
                    }
                </div>
            </div>
            {focus &&
                <div className={styles.footer}>
                    <button onClick={handleCancelPost} className={"btn btn-outline-secondary " + styles.cancelBtn}>Cancel</button>
                    <button onClick={handlePost} className={"btn btn-primary " + (postDisabled ? "disabled" : "")}>Post</button>
                </div>
            }
        </div>
    )
}