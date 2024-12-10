"use client"

import axios from "axios";
import { useEffect, useState } from "react";

export default function useUserData () {

    const [user, setUser] = useState<Mentor | Mentee | null>(null);

 
    useEffect(() => {
        // 쿠키에서 읽어온 user의 타입이 mentor인지 mentee인지 확인
        const cookie = {
            type: "Mentor",
            id:"junesung",

            // type:"Mentee",
            // id : "ju1asd3111"
        }

        async function fetchUserData () {
            // 쿠키에서 얻어온 정보로 Mentor, Mentee 나눠서 요청
            await axios.get(`http://localhost:8080/${cookie.type}/${cookie.id}`).then((result) => {

            if(cookie.type === "Mentor"){
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
            }

            if(cookie.type === "Mentee"){
                const mentee = result.data;

                const newUser : Mentee = {
                    type: "Mentee",
                    id : mentee.mentee_id,
                    email : mentee.mentee_email,
                    img : mentee.mentee_img,
                    nickname : mentee.mentee_nickname,
                    phone : mentee.mentee_phone,
                    wish: mentee.mentee_position,
                    gender : mentee.mentee_gender,
                    joinDate : mentee.mentee_createdAt,
                    suspension : mentee.mentee_suspension,
                } 

                setUser(newUser);

            }
            
            }).catch((error) => {
            console.log(error);
            })
        }

        fetchUserData();
       
    }, [])

    
    return user;
    
}

