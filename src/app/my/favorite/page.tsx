import MentorProfile from "@/components/MentorProfile";
import styles from "./favorite.module.scss";
import axios from "axios";

async function getFavoriteList() {

    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    
    // 쿠키에서 불러온 값이 멘토라면 튕겨냄

    // 멘티 아이디로 즐겨찾기 멘토 목록 불러옴
    const newFavoriteList : Mentor[] = [];
    
    // url이 ${API_URL}/mentor/:user?.id 이렇게 가야됨
    await axios.get(`${API_URL}/mentor`).then((result : any) => {
        console.log(result.data);
        result.data.map((mentor : any) => {
            newFavoriteList.push({
                type: "Mentor",
                id : mentor.mentor_id,
                email : mentor.mentor_email,
                profileImg : mentor.mentor_img,
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
                paperImg : mentor.mentor_paper_img,
            })
        })
    }).catch((error) => {
        console.log(error);
    })


    return newFavoriteList;
}

export default async function Favorite () {

    const favoriteList = await getFavoriteList();

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
                        career={favorite.career} />
                    })
                }
            </div>
        </main>
    )
}