"use client";

import DBIntroduceTrans from "@/utils/DBIntroduceTrans";
import DBMentorTrans from "@/utils/DBMentorTrans";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./with.module.scss"
import { useUserContext } from "@/context/UserContext";
import Modal from "@/components/Modal";
import { GoHeart, GoHeartFill } from "react-icons/go";
import Review from "@/components/Review";

interface PageProps {
    params : Promise<{id : string}>;
}

const With : React.FC<PageProps> =  ({params}) => {

    const [id, setId] = useState<string | null>(null);
    const [profile, setProfile] = useState<IntroduceProfile | null>(null);
    const router = useRouter();
    const { user, userType, checkAccessToken, logOut, isLogin } = useUserContext();
    const [showModal, setShowModal] = useState(false);
    const [isFavorited, setIsFavorited] = useState<boolean>(false);
    const [review, setReview] = useState<Review[]>([]);
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const mentor = profile?.mentor;
    const introduce = profile?.introduce;

    const handleWanted = (id: string | null) => {
        router.push(`/wanted/${id}`);
    }

    const addFavorite = async () => {
        try {
            await axios.post(`${API_URL}/favorite/${id}`, { mentee_id: user?.id });
            setIsFavorited(true);
            console.log("즐겨찾기 추가");
        } catch (error) {
            console.log(error);
        }
    }

    const delFavorite = async () => {
        try {
            await axios.delete(`${API_URL}/favorite/${id}`, { data: { mentee_id: user?.id } });
            setIsFavorited(false);
            console.log("즐겨찾기 삭제");
        } catch (error) {
            console.log(error);
        }
    }

    const handleFavorite = async () => {
        try {
            checkAccessToken();
            if (!isLogin) setShowModal(true);
            else {
                if (userType === "mentee") {
                    if (isFavorited) delFavorite();
                    else addFavorite();
                } else if (userType === "mentor") {
                    setShowModal(true);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
      const fetchData = async () => {
        const resolvedParams = await params;
        setId(resolvedParams.id);
      };

      fetchData();
    }, [params]);

    useEffect(() => {
        if (!id) return;

        const fetchProfile = async () => {
            try {
                const res = await axios.get(`${API_URL}/introduce/${id}`);
                const data = res.data;

                setProfile({
                    mentor: DBMentorTrans(data),
                    introduce: DBIntroduceTrans(data),
                });                
            } catch (error) {
                console.log(error);
            }
        };

        const checkFavorite = async () => {
            try {
                const res = await axios.get(`${API_URL}/favorite/${id}/${user?.id}`);
                setIsFavorited(res.data.check);

            } catch (error) {
                console.log(error);
            }
        }

        fetchProfile();
        checkFavorite();

    }, [id, isFavorited]);

    useEffect(() => {
        if (!introduce?.introduceId) return;

        const getReviews = async () => {
            try {
                const res = await axios.get(`${API_URL}/review/introduce/${introduce?.introduceId}`);
                const data = res.data;
                // console.log(data.reviews);

                const reviews = data.reviews.map((item: any) => ({
                    reviewId: item._id,
                    coffeechatId: item.coffeechat_id,
                    introduceId: item.introduce_id,
                    mentorId: item.mentor_id,
                    menteeId: item.mentee_id,
                    menteeImg: item.mentee_img,
                    menteeNickname: item.mentee_nickname,
                    content: item.review_content,
                    rating: item.review_rating,
                    date: item.createdAt,
                }));

                setReview(reviews);

            } catch (error) {
                console.log("작성된 리뷰가 없습니다.", error);
            }
        }

        getReviews();

    },[introduce?.introduceId])

    return (
        <main style={{flexDirection:"column", justifyContent:"flex-start", paddingTop:"0"}}>
            {showModal && (
                <Modal
                    title="접근 오류"
                    content={
                        isLogin ?
                            "멘티만 이용할 수 있습니다. 로그아웃 하시겠습니까?"
                            : "로그인이 필요합니다. 로그인 하시겠습니까?"
                    }
                    onConfirmClick={() => {
                        if (isLogin) logOut();
                        setShowModal(false);
                        router.push("/login");
                    }}
                    onCancelClick={() => setShowModal(false)}
                />
            )}
            <div className={styles.profileWrap}>
                <div className={styles.topContainer}>
                    <div className={styles.imgFrame}>
                        <img
                            src={
                                mentor?.profileImg
                                ? `${API_URL}/${mentor.profileImg}`
                                : "/images/default_profile.png"
                            }
                        />
                    </div>              
                    <div className={styles.profileContainer}>
                        <p className={styles.nickname}>{mentor?.nickname}</p>
                        <p>{mentor?.company}</p>
                        <div className={styles.careerContainer}>
                            <p>{mentor?.position}</p>
                            <span className={styles.span}>|</span>
                            <p>{mentor?.career}</p>
                        </div>
                    </div>
                </div>
                <div className={styles.bottomContainer}>
                    <div className={styles.countContainer}>
                        <p>커피챗 {introduce?.coffeechatCount}회</p>
                        <span className={styles.span}>|</span>
                        <p>리뷰 {introduce?.reviewCount}개</p>
                        <span className={styles.span}>|</span>
                        <p>⭐ {introduce?.rating}</p>
                    </div>
                    <div className={styles.rightItems}>
                        <div className={`${styles.favorite} ${!isFavorited && styles.notFavorite}`} onClick={handleFavorite}>
                        {isFavorited ?
                            ( <GoHeartFill style={{ fontSize: "20px" }} /> )
                            : ( <GoHeart style={{ fontSize: "20px"}} /> )
                            }
                            <p>{mentor?.favoriteCount}</p>
                        </div>
                        <button onClick={() => handleWanted(id)}>커피챗 제안하기</button>
                    </div>
                </div>
            </div>
            <div className={styles.introduceContainer}>
                <p className={styles.title}>{introduce?.title}</p>
                <div className={styles.content}>{introduce?.content}</div>
                <div className={styles.tagContainer}>
                    {introduce?.tag.map((tag, index) => (
                        <div key={index} className={styles.tagFrame}>{tag}</div>
                    ))}
                </div>
            </div>
            <div className={styles.line}></div>
            <div className={styles.reviewWrap}>
                <p className={styles.reviewTitle}>{mentor?.nickname} 멘토와의 <span>커피챗 후기</span></p>
                <div className={styles.reviewContainer}>
                    {review.length > 0 ? (
                      review.map((item, index) => (
                        <Review
                          key={index}
                          menteeImg={item.menteeImg}
                          menteeNickname={item.menteeNickname}
                          content={item.content}
                          rating={item.rating}
                          date={item.date}
                        />
                      ))
                    ) : (
                        <p>작성된 후기가 없습니다.</p>
                    ) 
                }
                </div>
            </div>
        </main>
    )
}

export default With;
