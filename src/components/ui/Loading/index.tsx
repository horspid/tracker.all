import styles from './Loading.module.scss'

const Loading = () => {
    return (
        <div className={styles.loading__container}>
            <div className={styles.loading}></div>
        </div>
    )
}

export default Loading;