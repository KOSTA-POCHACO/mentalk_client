"use client"

import MentorProfile from "@/components/MentorProfile";
import styles from "./favorite.module.scss";
import axios from "axios";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useMyFavorite from "@/hook/useMyFavorite";


export default async function Favorite () {

    const router = useRouter();

    const [favoriteList, setFavoriteList ] = useState<Mentor[] | null>(); 
    const favoriteMentorData = useMyFavorite();

    const { user } = useUserContext();

    useEffect(() => {
        if(favoriteMentorData) {
            setFavoriteList(favoriteMentorData);
        }
    }, [])

    // 쿠키에서 불러온 값이 멘토라면 튕겨냄
    if(user?.type === "Mentor"){
        router.push("/my")
    }

    return (
        <main>
            <div className={styles.favoriteContainer}>
                {
                    favoriteList?.map((favorite : Mentor, index : number) => {
                        return <MentorProfile
                        key={index}
                        nickname={favorite.nickname} 
                        position={favorite.position}
                        company={favorite.company}
                        career={favorite.career}
                        profileImg={favorite.profileImg} />
                    })
                }
            </div>
        </main>
    )
}