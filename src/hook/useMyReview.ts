"use client"

import { useUserContext } from "@/context/UserContext";
import axios from "axios"
import { useEffect, useState } from "react";

export default function useReview () {

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const { user } = useUserContext();

    const [reviews, setReviews] = useState<Review[] | null>(null);

    useEffect(() => {

        if(!user?.id){
            return;
        }

        async function fetchMyReviews(userId : string){
           await axios.get(`${API_URL}/review/${userId}`)
            .then((result)=> {

                console.log(result);
                console.log(result.data.reviews);

                const newReviewList : Review[] = [];

                result.data.reviews.map((review : any) => {
                    newReviewList.push({
                        coffeechatId : review.coffeechat_id,
                        content : review.review_content,
                        rating : review.review_rating
                    })
                })
    
                setReviews(newReviewList);
            })
        }
    
        fetchMyReviews(user?.id);
    }, [])

    return reviews;
}