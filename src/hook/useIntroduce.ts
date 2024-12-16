"use client"

import { useUserContext } from "@/context/UserContext";
import axios from "axios";
import { useEffect, useState } from "react";

export default function useUserData () {

    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    
    const { user } = useUserContext();

    const [introduce, setIntroduce] = useState<Introduce | null>(null);
 
    useEffect(() => {

        async function fetchIntroduceData () {
            await axios.get(`${API_URL}/intro/${user?.id}`).then((result) => {

                const introduce = result.data.mentor_intro;

                const newIntroduce = {
                    mentorId : introduce.mentor_id,
                    title : introduce.mentor_title,
                    content :introduce.mentor_content,
                    reviewCount : introduce.review_count,  
                    coffeechatCount : introduce.coffeechat_count,
                    rating : introduce.mentor_rating,
                }

                setIntroduce(newIntroduce);
            })


        }

        fetchIntroduceData();
       
    }, [])

    
    return introduce;
    
}

