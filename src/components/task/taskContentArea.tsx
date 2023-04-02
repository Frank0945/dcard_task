import styles from '@/styles/components/task/TaskContentArea.module.css'
import { useEffect, useRef } from 'react';

export default function TaskContentArea(props: { content: string, editable: boolean, contentChange: (content: string) => void }) {

    const contentRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        contentRef.current!.value = props.content;
        contentRef.current!.style.height = '0';
        contentRef.current!.style.height = contentRef.current!.scrollHeight + 'px';
    }, [props.content, props.editable]);

    const handleChange = () => {
        props.contentChange(contentRef.current!.value);
    }

    return (
        <textarea
            ref={contentRef}
            className={styles.content + (props.editable ? ` ${styles.editable}` : '')}
            rows={1}
            onChange={handleChange}
            defaultValue={props.content}
            autoFocus={(props.editable && props.content) as boolean}
            onFocus={(e) => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
        />
    )
}