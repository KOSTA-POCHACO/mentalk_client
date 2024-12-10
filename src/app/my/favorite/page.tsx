import MentorProfile from "@/components/MentorProfile";
import styles from "./favorite.module.scss";
import axios from "axios";

async function getFavoriteList() {
    // 쿠키에서 불러온 값이 멘토라면 튕겨냄

    // 멘티 아이디로 즐겨찾기 멘토 목록 불러옴
    const newFavoriteList : Mentor[] = [];
    
    // url이 http://localhost:8080/mentor/:user?.id 이렇게 가야됨
    await axios.get(`http://localhost:8080/mentor`).then((result : any) => {
        console.log(result.data);
        result.data.map((mentor : any) => {
            newFavoriteList.push({
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
                    favoriteList?.map((favorite : Mentor) => {
                        return <MentorProfile
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