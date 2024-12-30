"use client";

import MentorProfile from "@/components/MentorProfile";
import styles from "./favorite.module.scss";
import axios from "axios";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useMyFavorite from "@/hook/useMyFavorite";

export default function Favorite() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  const [favoriteList, setFavoriteList] = useState<Mentor[] | null>(null);
  // const favoriteMentorData = useMyFavorite();

  const { user } = useUserContext();

  useEffect(() => {
    // url이 ${API_URL}/favorite/:user?.id 이렇게 가야됨

    console.log("favorite에서 부른 user");
    console.log(user);

    axios
      .get(`${API_URL}/favorite/${user?.id}`)
      .then((result: any) => {
        const newFavoriteList: Mentor[] = [];

        result.data.favorites.map((mentor: any) => {
          newFavoriteList.push({
            type: "Mentor",
            id: mentor.mentor_id,
            email: mentor.mentor_email,
            profileImg: mentor.mentor_img,
            nickname: mentor.mentor_nickname,
            phone: mentor.mentor_phone,
            company: mentor.mentor_company,
            category: mentor.mentor_category,
            position: mentor.mentor_position,
            career: mentor.mentor_career,
            isChecked: mentor.mentor_is_checked,
            warningCount: mentor.mentor_warning_count,
            favoriteCount: mentor.mentor_favorite_count,
            gender: mentor.mentor_gender,
            joinDate: mentor.mentor_joinDate,
            suspension: mentor.mentor_suspension,
            paperImg: mentor.mentor_paper_img,
          });
        });

        setFavoriteList(newFavoriteList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user]);

  // 쿠키에서 불러온 값이 멘토라면 튕겨냄
  if (user?.type === "Mentor") {
    router.push("/my");
  }

  return (
    <>
      <div className={styles.favoriteContainer}>
        {favoriteList?.map((favorite: Mentor, index: number) => {
          return (
            <MentorProfile
              key={index}
              nickname={favorite.nickname}
              position={favorite.position}
              company={favorite.company}
              career={favorite.career}
              profileImg={favorite.profileImg}
            />
          );
        })}
      </div>
    </>
  );
}
