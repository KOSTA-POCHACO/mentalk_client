"use client"

import DBIntroduceTrans from "@/utils/DBIntroduceTrans";
import DBMentorTrans from "@/utils/DBMentorTrans";
import axios from "axios";
import { use, useEffect, useState } from "react";

interface PageProps {
    params : Promise<{id : string}>;
}

const With : React.FC<PageProps> =  ({params} ) => {

    // Next.js 13 부터는 params가 Promise 객체로 변환되기 때문에
    // use() 훅을 사용해 비동기적으로 처리 후 사용
    const { id } = use(params);
    const [mentor, setMentor] = useState<Mentor | null>(null);
    const [introduce, setIntroduce] = useState<Introduce | null>(null);

    useEffect(() => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;

        const fetchMentorData = async () => {
            try {
                const mentor = await axios.get(`${API_URL}/mentor/${id}`);
                setMentor(DBMentorTrans(mentor.data));
            } catch (error) {
                console.log(error);
            }
        };

        const fetchIntroduce = async () => {
            console.log("여긴 타니?")
            try {
                const introduce = await axios.get(`${API_URL}/introduce/${id}`);
                setIntroduce(DBIntroduceTrans(introduce.data.mentor_introduce))
                console.log("이건 나오니?", introduce)
            } catch (error) {
                console.log(error);
            }
        }

        fetchMentorData();
        fetchIntroduce();
    }, []);

    console.log("해당 멘토 정보", mentor)
    console.log("소개글 정보", introduce)
    return (
        <main>
            <h1>With page id:{id}</h1>
            <div>
                <div>닉네임{mentor?.nickname}</div>
                <div>회사{mentor?.company}</div>
                <div>직군{mentor?.position}</div>
                <div>경력{mentor?.career}</div>
            </div>

            <div>
                <div>제목{introduce?.title}</div>
                <div>내용{introduce?.content}</div>
            </div>
        </main>
    )
}

export default With;
