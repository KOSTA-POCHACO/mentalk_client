"use client";

import { useUserContext } from "@/context/UserContext";
import axios from "axios";

export default async function useMyFavorite() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const { user } = useUserContext();

  // 멘티 아이디로 즐겨찾기 멘토 목록 불러옴
  const newFavoriteList: Mentor[] = [];

  // url이 ${API_URL}/favorite/:user?.id 이렇게 가야됨
  await axios
    .get(`${API_URL}/favorite/${user?.id}`)
    .then((result: any) => {
      console.log(result.data);
      result.data.map((mentor: any) => {
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

      return newFavoriteList;
    })
    .catch((error) => {
      console.log(error);
    });
}
