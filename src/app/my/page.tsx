"use client"

import { useEffect, useState } from "react";
import styles from "./my.module.scss"
import axios from "axios";
import useUserData from "@/hook/useUserData";
import Link from "next/link";
import { useRouter } from "next/navigation";

const My : React.FC =  () => {
<<<<<<< HEAD

    const [user, setUser] = useState<Mentor | Mentee | null>({
        type: "Mentee",
        id : "test",
        email : "",
        nickname : "",
        img : "",
        phone : "",
        company : "",
        category : "",
        position : "",
        career : "",
        isChecked : false,
        warningCount : 0,
        favoriteCount : 0,
        gender : "",
        joinDate : "",
        suspension : false,
    });

    useEffect(() => {
        // 쿠키에서 읽어온 user의 타입이 mentor인지 mentee인지 확인

        // 만약에 쿠키에서 얻어온 정보가 mentor면
        axios.get(`http://localhost:8080/mentor/test`).then((result) => {

            const mentor = result.data;

            const newUser : Mentor = {
                type: "Mentor",
                id : mentor.mentor_id,
                email : mentor.mentor_email,
                img : mentor.mentor_img,
                nickname : mentor.mentor_nickname,
                phone : mentor.mentor_phone,
                company : mentor.mentor_company,
                category : mentor.mentor_category,
                position : mentor.mentor_position,
                career : mentor.mentor_career,
                isChecked : mentor.mentor_is_checked,
                warningCount : mentor.mentor_warning_count,
                favoriteCount : mentor.mentor_favorite_count,
                gender : mentor.mentor_gender,
                joinDate : mentor.mentor_joinDate,
                suspension : mentor.mentor_suspension,
            } 

            setUser(newUser);

            
        }).catch((error) => {
            console.log(error);
        })

        // 만약에 쿠키에서 얻어온 정보가 mentee면

        
    }, [])
=======
    const router = useRouter();
    const [user, setUser] = useState<Mentor | Mentee | null>(null);
    const userData = useUserData();

    useEffect(() => {
        setUser(userData);
    }, [userData])
>>>>>>> d008a2e (introduce 조회)


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