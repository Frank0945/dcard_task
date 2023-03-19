import styles from '@/styles/components/PostTask.module.css'
import { useRef, useState } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';

export default function PostTask() {

    const [focus, setFocus] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const contentRef = useRef<HTMLSpanElement>(null);

    const handelCancelFocus = () => {
        if (!title && !content)
            setFocus(false);
    };
    const mainRef = useDetectClickOutside({ onTriggered: handelCancelFocus });

    const handleChange = (e: React.ChangeEvent<HTMLSpanElement>) => {
        setContent(e.target.innerText);
        setFocus(true);
    };

    const handelCancelPost = () => {
        setTitle('');
        setContent('');
        contentRef.current!.textContent = '';
        setFocus(false);
    };

    const handelPost = () => {
        console.log(title);
        console.log(content);
    };

    return (
        <div className={styles.main} ref={mainRef}>
            {focus &&
                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className={styles.title} />
            }
            <div className={styles.body}>
                {!content &&
                    <span className={styles.addTaskPlaceholder}>Add Task...</span>
                }
                <span
                    ref={contentRef}
                    contentEditable
                    onClick={() => setFocus(true)}
                    onInput={handleChange}
                    className={styles.content}
                    role="textbox"
                >
                </span>
            </div>
            {content &&
                <div className={styles.footer}>
                    <button onClick={handelCancelPost} className={"btn btn-outline-secondary " + styles.cancelBtn}>Cancel</button>
                    <button onClick={handelPost} className={"btn btn-primary " + styles.postBtn}>Post</button>
                </div>
            }
        </div>
    )
}