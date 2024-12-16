"use client"

import styles from "./my.module.scss"
import Link from "next/link";
import { useRouter } from "next/navigation";
import CustomButton from "@/components/CustomButton";
import { useUserContext } from "@/context/UserContext";
import { useEffect } from "react";

const My : React.FC =  () => {
    const router = useRouter();

    const { user } = useUserContext();

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        console.log(user);
    })


    if(user?.type === "Mentor"){
        // 멘토로 타입 변환
        const mentor = user as Mentor;

        // 멘토 마이페이지
        return (
            <main>
                <div className={styles.wrap}>
                    <div className={styles.profileContainer}>
                        <div className={styles.profileImg}>
                            <img src={
                            user.profileImg ? 
                            `${API_URL}/${user.profileImg}` : "/images/default_profile.png"
                            } alt="" />
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
                            <CustomButton content="수정하기" onClick={() => {router.push("/my/edit")}}/>
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
                        <img src={
                        user.profileImg ? 
                        `${API_URL}/${user.profileImg}` : "/images/default_profile.png"
                        } alt="" />
                    </div>
                    {mentee?.nickname}
                </div>

                <div className={styles.positionContainer}>
                        {
                            mentee.position.map((position) => {
                                return (
                                    <div className={styles.item}>
                                        {position}
                                    </div>
                                )
                            })
                        }
                       
                       
                    </div>


                <div>
                    <Link href={"/my/edit"}>
                        <CustomButton content="수정하기" onClick={() => {router.push("/my/edit")}}/>
                    </Link>
                </div>
            </div>
        </main>
        )
    }



}


export default My;
