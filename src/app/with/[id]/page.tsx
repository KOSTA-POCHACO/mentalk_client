"use client";

import DBIntroduceTrans from "@/utils/DBIntroduceTrans";
import DBMentorTrans from "@/utils/DBMentorTrans";
import axios from "axios";
import { useRouter } from "next/navigation";
import { use, useContext, useEffect, useState } from "react";
import styles from "./with.module.scss"
import { useUserContext } from "@/context/UserContext";
import Modal from "@/components/Modal";

interface PageProps {
    params : Promise<{id : string}>;
}

const With : React.FC<PageProps> =  ({params}) => {

    const { id } = use(params);
    const [profile, setProfile] = useState<IntroduceProfile>();
    const router = useRouter();
    const { user, userType, checkAccessToken, logOut } = useUserContext();
    const [showModal, setShowModal] = useState(false);
    const [isFavorited, setIsFavorited] = useState(false);
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const handleWanted = (id: string) => {
        router.push(`/wanted/${id}`);
    }

    const addFavorite = async () => {
        try {
            await axios.post(`${API_URL}/favorite/${id}`, { mentee_id: user?.id });
            setIsFavorited(true);
        } catch (error) {
            console.log(error);
        }
    }

    const delFavorite = async () => {
        try {
            await axios.delete(`${API_URL}/favorite/${id}`, { data: { mentee_id: user?.id } });
            setIsFavorited(false);
        } catch (error) {
            console.log(error);
        }
    }

    const checkFavorite = async () => {
        try {
            const res = await axios.get(`${API_URL}/favorite/${id}/${user?.id}`);
            console.log("DB 어떻게 넘어옴?",res.data.check)
            if (res.data.check) {
                delFavorite();
                setIsFavorited(false);
                console.log("즐겨찾기 삭제")
            }
            else {
                addFavorite();
                setIsFavorited(true);
                console.log("즐겨찾기 추가")
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleFavorite = async () => {
        try {
            checkAccessToken();
            if (userType === "mentee") {
                checkFavorite();
            } else if (userType === "mentor") {
                setShowModal(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        const fetchProfile = async () => {
            try {
                const res = await axios.get(`${API_URL}/introduce/${id}`);
                const data = res.data;

                setProfile({
                    mentor: DBMentorTrans(data),
                    introduce: DBIntroduceTrans(data),
                });                

                // 즐겨찾기 관련 내용 추가해야댐
            } catch (error) {
                console.log(error);
            }
        };
        
        fetchProfile();
    }, [id]);

    // console.log("해당 멘토 정보", mentor)
    // console.log("소개글 정보", introduce)
    return (
        <main className={styles.main}>
            {showModal && (
                <Modal
                    title="접근 오류"
                    content="멘티만 이용할 수 있습니다. 로그아웃 하시겠습니까?"
                    onConfirmClick={() => {
                        logOut;
                        setShowModal(false);
                        router.push("/login");
                    }}
                    onCancelClick={() => setShowModal(false)}
                />
            )}
            <div>
                <div>닉네임{profile?.mentor.nickname}</div>
                <div>회사{profile?.mentor.company}</div>
                <div>직군{profile?.mentor.position}</div>
                <div>경력{profile?.mentor.career}</div>
            </div>

            <div>
                <div>제목{profile?.introduce.title}</div>
                <div>태그
                    {profile?.introduce.tag.map((tag, index) => (
                        <div key={index} className={styles.tagFrame}>{tag}</div>
                    ))}
                </div>
                <div>내용{profile?.introduce.content}</div>
            </div>
            <button onClick={() => handleWanted(id)}>커피챗 제안하기</button>
            <div className={styles.favorite} onClick={handleFavorite}>즐겨찾기 추가</div>
        </main>
    )
}

export default With;
