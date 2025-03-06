import styles from './Logo.module.scss'

const Logo = () => {
    return (
        <div className={styles.logo}>
            <img className={styles.logo__img} src="" alt="logo" />
            <div className={styles.logo__text}>
                <span>tracker</span>
                <span>.all</span>
            </div>
        </div>
    )
}

export default Logo;