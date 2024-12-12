import styles from "./review.module.scss"

interface reviewProps {
    coffeechatId : string,
    content : string,
    rating : number;
}

const Review : React.FC<reviewProps> = ({coffeechatId, content, rating}) => {

    return (
        <>
            <section className={styles.wrap}>
                <div className={styles.profileContainer}>
                    <div className={styles.infoContainer}>
                        <p className={styles.profileImg}>
                            <img src="/" alt="" />
                        </p>
                        <p className={styles.nickname}>여기가닉네임어디까지길어지는거예용</p>
                        <p> {"⭐️ ".repeat(rating)}</p>
                    </div>
                    <div className={styles.dateContainer}>
                        <p>2024. 12. 31</p>
                    </div>
                   
                </div>
                <div className={styles.contentContainer}>
                    {content}
                    {content}
                    {content}
                    {content}
                    {content}
                    {content}
                    {content}
                    {content}
                    {content}
                    {content}
                    {content}
                    {content}
                    {content}
                    {content}
                    {content}
                    {content}
                </div>

            </section>
        </>
    )
}

export default Review;