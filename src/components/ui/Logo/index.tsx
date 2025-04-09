import logo from '@assets/images/logo.svg'
import styles from './Logo.module.scss'
import { useNavigate } from 'react-router'

const Logo = () => {

    const navigate = useNavigate()

    return (
        <div className={styles.logo} onClick={() => navigate(`/`)}>
            <img className={styles.logo__img} src={logo} alt="logo" />
            <div className={styles.logo__text}>
                <span>tracker</span>
                <span>.all</span>
            </div>
        </div>
    )
}

export default Logo;