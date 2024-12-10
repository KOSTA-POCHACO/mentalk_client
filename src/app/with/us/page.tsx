
import axios from "axios";
import styles from "./us.module.scss"
import MentorProfile from "@/components/MentorProfile";


async function getMentors() {
    
    const mentorList : Mentor[] = []; 

    await axios.get(`http://localhost:8080/mentor`).then((result) => {
        result.data.map((mentor : any) => {
            const newMentor = {
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
    
            mentorList.push(newMentor);
        })
    }).catch((error) => {
        console.log(error);
    })

    return mentorList;
}

export default async function WithUs () {

    const mentors = await getMentors();

    return (
        <>
        <main>
            <div className={styles.favoriteContainer}>

                {
                    mentors.map((mentor : Mentor, index : number) => {
                        return <MentorProfile 
                        key={index}
                        nickname={mentor.nickname}
                        company={mentor.company}
                        position={mentor.position}
                        career={mentor.career}/>
                    })
                }
            </div>
        </main>

        </>
        
    )
}
