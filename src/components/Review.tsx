import styles from "./review.module.scss"

interface ReviewProps {
  menteeImg?: string;
  menteeNickname: string;
  content: string;
  rating: number;
  date: string;
}

const Review : React.FC<ReviewProps> = ({menteeImg, menteeNickname, content, rating, date}) => {

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    return (
        <>
          <div className={styles.review}>
            <div className={styles.wrap}>
              <div className={styles.topContainer}>
                <div className={styles.profile}>
                  <div className={styles.imgFrame}>
                    <img src={
                      menteeImg
                          ? `${API_URL}/${menteeImg}`
                          : "/images/default_profile.png"
                    } />
                  </div>
                  <p>{menteeNickname}</p>
                </div>
                <p>{"⭐️".repeat(rating)}</p>
              </div>
              <p className={styles.content}>{content}이 포스팅은 왜 안좋은 리뷰 밖에 없어여 이 포스팅은 왜 안좋은 리뷰 밖에 없어여 이 포스팅은 왜 안좋은 리뷰 밖에 없어여 이 포스팅은 왜 안좋은 리뷰 밖에 없어여 이 포스팅은 왜 안좋은 리뷰 밖에 없어여 이 포스팅은 왜 안좋은 리뷰 밖에 없어여 </p>
            </div>
            <p className={styles.date}>{date}</p>
          </div>            
        </>
    )
}

export default Review;