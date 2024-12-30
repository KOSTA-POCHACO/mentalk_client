import styles from "./IntroduceCard.module.scss"

const IntroduceCard: React.FC<IntroduceProfile> = ({ mentor, introduce }) => {

    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const MAX_TAGS = 5;

    return (
      <>
        <div className={styles.wrap}>
          <div className={styles.topContainer}>
            <div className={styles.imgFavorite}>
              <div className={styles.imgFrame}>
                <img
                  src={
                    mentor.profileImg
                      ? `${API_URL}/${mentor.profileImg}`
                      : "/images/default_profile.png"
                  }
                />
              </div>
              <p>❤️ {mentor.favoriteCount}</p>
            </div>
            <div className={styles.mentorContainer}>
              <strong>
                <p className={styles.nicknameFrame}>{mentor.nickname}</p>
              </strong>
              <p>{mentor.company}</p>
              <div className={styles.careerFrame}>
                <p>{mentor.position}</p>
                <span>|</span>
                <p>{mentor.career}</p>
              </div>
            </div>
          </div>
          <div className={styles.bottomContainer}>
            <div className={styles.countContainer}>
              <p>커피챗 {introduce.coffeechatCount}회</p>
              <span>|</span>
              <p>리뷰 {introduce.reviewCount}개</p>
              <span>|</span>
              <p>⭐ {introduce.rating}</p>
            </div>
            <strong>
              <p className={styles.titleFrame}>{introduce.title}</p>
            </strong>
            <div className={styles.tagContainer}>
              {introduce.tag.slice(0, MAX_TAGS).map((tag, index) => (
                <div key={index} className={styles.tagFrame}>{tag}</div>
              ))}
              {introduce.tag.length > MAX_TAGS && (
                <div className={styles.tagFrame}>...</div>
              )}
            </div>
          </div>
        </div>
      </>
    );
}

export default IntroduceCard;