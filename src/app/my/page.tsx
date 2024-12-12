"use client"

import { useEffect, useState } from "react";
import styles from "./my.module.scss"
import useUserData from "@/hook/useUser";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useMyReview from "@/hook/useMyReview";

const My : React.FC =  () => {
    const router = useRouter();

    const [user, setUser] = useState<Mentor | Mentee | null>(null);
    const userData = useUserData();

    useEffect(() => {
        setUser(userData);
    }, [userData])


    if(user?.type === "Mentor"){
        // 멘토로 타입 변환
        const mentor = user as Mentor;

        // 멘토 마이페이지
        return (
            <main>
                <div className={styles.wrap}>
                    <div className={styles.profileContainer}>
                        <div className={styles.profileImg}>
                        </div>
                        {mentor?.nickname}
                    </div>
    
                    <div className={styles.infoContainer}>
                        <div className={styles.item}>
                            <p><strong>소속</strong></p><p>{mentor?.company}</p>
                        </div>
                        <div className={styles.item}>
                            <p><strong>카테고리</strong></p><p>{mentor?.category}</p>
                        </div>
                        <div className={styles.item}>
                            <p><strong>직무</strong></p><p>{mentor?.position}</p>
                        </div>
                    </div>

                    <div>
                        <Link href={"/my/edit"}>
                            <button className={styles.editBtn} onClick={() => {}}>수정하기</button>
                        </Link>
                    </div>
                </div>
            </main>
        )
    }
   
    if(user?.type === "Mentee"){
        // 멘티로 타입 변환
        const mentee = user as Mentee;

        // 멘티 마이페이지
        return (
            <main>
                <div className={styles.wrap}>
                    <div className={styles.profileContainer}>
                        <div className={styles.profileImg}>
                        </div>
                        닉네임어디까지올라가는거예요닉네임길이테스트
                    </div>

                    <div className={styles.wishContainer}>
                        {
                            mentee.wish.map((position) => {
                                return (
                                    <div className={styles.item}>
                                        {position}
                                    </div>
                                )
                            })
                        }
                       
                       
                    </div>
               <button className={styles.editBtn} onClick={() => {router.push("/my/edit")}}>수정하기</button>
                </div>
            </main>
        )
    }



}


export default My;