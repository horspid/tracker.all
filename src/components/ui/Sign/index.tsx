import SignICO from '@assets/images/icons/sign.svg?react'
import styles from './Sign.module.scss'
import { Link, useNavigate } from 'react-router'
import { logout } from '@services/userAuth'

interface SignProps{
    className: string,
    name: string,
    isLoggedIn: boolean
}


const Sign = ({ className, name, isLoggedIn }: SignProps) => {

    const navigate = useNavigate();

    const onClickHandler = async () => {
        if (isLoggedIn) {
            await logout();
            navigate(`/login`);
        }
    }

    return (
        <Link to={`/login`} onClick={onClickHandler}>
            <div className={styles.sign}>
                <SignICO className={styles[`sign__` + className]}/>
                <span className={styles.sign__name}>{name}</span>
            </div>
        </Link>
    )
}

export default Sign