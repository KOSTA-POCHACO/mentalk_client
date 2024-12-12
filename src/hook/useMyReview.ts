"use client"

import axios from "axios"
import { useEffect, useState } from "react";

export default function useReview () {

    const [reviews, setReviews] = useState<Review[] | null>(null);

    useEffect(() => {

        async function fetchMyReviews(userId : string){
           await axios.get(`http://localhost:8080/review/${userId}`)
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
    
        fetchMyReviews("mentee123");
    }, [])

    return reviews;
}