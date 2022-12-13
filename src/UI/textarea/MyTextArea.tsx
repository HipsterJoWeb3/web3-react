import styles from './MyTextArea.module.scss'

export interface MyTextAreaProps {
    cols?: number
    rows?: number
    value: string | any
    setValue: (value: string) => void
    placeholder?: string
    full?: boolean
}

const MyTextArea: React.FC<MyTextAreaProps> = ({full, cols, rows, value, setValue, placeholder}) => {

    return (
        <textarea
            className={full ? `${styles.textarea} ${styles.textareaFull}` : styles.textarea}
            cols={cols}
            rows={rows}
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder={placeholder}
        ></textarea>
    )

}

export default MyTextArea