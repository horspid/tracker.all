import styles from './SkeletonCard.module.scss'

interface SkeletonCardProps {
    listToRender: number
}

const SkeletonCard = ({listToRender} : SkeletonCardProps) => {

    const skeletons = Array(listToRender).fill(null);
    
    return (
      <>
        {skeletons.map((_, index) => (
            <article className={styles.skeleton_card} key={index}>
                <div className={styles.skeleton_card__image}>
                    <div className={styles.skeleton_card__img}></div>
                </div>
                <div className={styles.skeleton_card__stats}>
                    <h2 className={styles.skeleton_card__title}>SomeTitleMovie</h2>
                </div>
            </article>
        ))}
      </>
    )
}

export default SkeletonCard