// "use client"

// import axios from "axios";
// import styles from "./us.module.scss"
// import MentorProfile from "@/components/MentorProfile";
// import { useRouter } from "next/navigation";


// async function getMentors() {

//     const API_URL = process.env.NEXT_PUBLIC_API_URL;
    
//     const mentorList : Mentor[] = [];

//     await axios.get(`${API_URL}/mentor`).then((result) => {
//         result.data.map((mentor : any) => {
//             const newMentor = {
//                 type: "Mentor",
//                 id : mentor.mentor_id,
//                 email : mentor.mentor_email,
//                 img : mentor.mentor_img,
//                 nickname : mentor.mentor_nickname,
//                 profileImg : mentor.mentor_img,
//                 paperImg : mentor.mentor_paper_img,
//                 phone : mentor.mentor_phone,
//                 company : mentor.mentor_company,
//                 category : mentor.mentor_category,
//                 position : mentor.mentor_position,
//                 career : mentor.mentor_career,
//                 isChecked : mentor.mentor_is_checked,
//                 warningCount : mentor.mentor_warning_count,
//                 favoriteCount : mentor.mentor_favorite_count,
//                 gender : mentor.mentor_gender,
//                 joinDate : mentor.mentor_createdAt,
//                 suspension : mentor.mentor_suspension,
//             }
    
//             mentorList.push(newMentor);
//         })
//     }).catch((error) => {
//         console.log(error);
//     })

//     return mentorList;
// }

// export default async function WithUs () {

//     const mentors = await getMentors();
//     const router = useRouter();
    
//     const handleClick = (id: string) => {
//         router.push(`/with/${id}`);
//     };

//     return (
//         <>
//         <main>
//             <div className={styles.wrap}>
//                 <div className={styles.favoriteContainer}>
//                     {mentors.map((mentor : Mentor, index : number) => {
//                         return (
//                             <div
//                                 key={index}
//                                 onClick={() => handleClick(mentor.id)}
//                             >
//                             <MentorProfile
//                                 nickname={mentor.nickname}
//                                 company={mentor.company}
//                                 position={mentor.position}
//                                 career={mentor.career}
//                                 profileImg={mentor.profileImg} />
//                             </div>
//                         );
//                     })}
//                 </div>
//             </div>
           
//         </main>

//         </>
        
//     )
// }

const WithUs: React.FC = () => {
    return (
        <main>포스팅 리스트</main>
    )
}

export default WithUs;