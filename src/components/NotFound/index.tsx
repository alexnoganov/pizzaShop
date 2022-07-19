import styles from './NotFound.module.scss'

function NotFound({title, text}: {title:string, text: string}) {
    return <div className={styles.notFound}>
        <span>😕</span>
        <h1>{title}</h1>
        <p className={styles.desc}>{text}</p>
    </div>;
}

export default NotFound;