"use client";

import Modal from "@/components/Modal";
import styles from "./edit.module.scss"
import useUserData from "@/hook/useUser";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Edit : React.FC = () => {
    const router = useRouter();

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const [user, setUser] = useState<Mentor | Mentee | null>(null);
    const userData = useUserData();

    useEffect(() => {
        setUser(userData);
        setFormData(userData);
    }, [userData])

    const [modalMessage, setModalMessage] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);


    const [formData, setFormData] = useState<Partial<Mentor | Mentee | null>>(null);

 
    function handleChange (e :React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;

        if(name == "position"){
            const updatePosition = value.split(",").map((item) => item.trim());

            console.log(updatePosition);

            if(updatePosition.length > 3){
                setModalMessage("희망 직무는 세개까지만 등록할 수 있습니다.")
                setIsModalOpen(true);
                return;
            }

            setFormData((prevState) => ({
                ...prevState,
                position : updatePosition,
            }));

            console.log(formData);

            return;
        }

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        console.log(formData);
    }

    function handleSubmit(e : React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        axios.put(`${API_URL}/${user?.type}/${user?.id}`, 
            user?.type === "Mentor" ? 
            {
                mentor_nickname : formData?.nickname,
                mentor_email : formData?.email,
            }
            :
            {
                mentee_nickname : formData?.nickname,
                mentee_email : formData?.email,
            }
        ).then((result) => {
            console.log(result.data.message);
            setModalMessage(result.data.message);
            setIsModalOpen(true);
        }).catch((error) => {
            console.log(error);
        })
    }

   
    // 멘토면
    if(user?.type === "Mentor"){
        // 멘토로 타입 변환
        const mentor = user as Mentor;

        // 멘토 마이페이지
        return (
            <>
            {
                isModalOpen ? <Modal title="유저 수정" content={modalMessage} onConfirmClick={() => {router.push("/my")}} onCancelClick={() => {setIsModalOpen(false)}}/> : ""
            }
            <main>
                <form className={styles.wrap} onSubmit={(e) => {e.preventDefault(); handleSubmit(e)}} method="put">
                    <div className={styles.profileContainer}>
                        <div className={styles.profileImg}>
                        </div>
                    </div>
    
                    <div className={styles.infoContainer}>

                        <div className={styles.itemContainer}>
                            <h3>기본 정보</h3>
                            <div className={`${styles.item} ${styles.readonly}`}>
                                <p><strong>아이디</strong></p><p>{mentor?.id}</p>
                            </div>
                      
                            <div className={`${styles.item}`}>
                                <p><strong>닉네임</strong></p>
                                <input 
                                name="nickname"
                                placeholder="변경할 닉네임을 입력하세요"
                                value={formData?.nickname}
                                onChange={handleChange}/>
                            </div>
                            <div className={styles.item}>
                                <p><strong>이메일</strong></p>
                                <input 
                                type="email"
                                name="email"
                                placeholder="변경할 이메일을 입력하세요"
                                value={formData?.email}
                                onChange={handleChange}/>
                            </div>
                        
                            
                            <br></br>
                            <h3>직무</h3>
                            <div className={`${styles.item} ${styles.readonly}`}>
                                <p><strong>소속</strong></p><p>{mentor?.company}</p>
                            </div>
                            <div className={`${styles.item} ${styles.readonly}`}>
                                <p><strong>카테고리</strong></p><p>{mentor?.category}</p>
                            </div>
                            <div className={`${styles.item} ${styles.readonly}`}>
                                <p><strong>직무</strong></p><p>{mentor?.position}</p>
                            </div>
                        </div>
                       

                        <div className={styles.buttonContainer}>
                        <button className={styles.editBtn}>수정</button>
                        <button className={styles.cancelBtn} onClick={() => {router.push("/my")}}>취소</button>
                    </div>
               
                 
                    </div>
                 
                </form>
            </main>
            </>

        )
    }

    // 멘티면 
    if(user?.type === "Mentee"){
        // 멘티로 타입 변환
        const mentee = user as Mentee;

        // 멘티 마이페이지
        return (
            <main>
                <form className={styles.wrap} onSubmit={(e) => {e.preventDefault(); handleSubmit(e);}} method="put">
                    <div className={styles.profileContainer}>
                        <div className={styles.profileImg}>
                        </div>
                    </div>


                    <div className={styles.infoContainer}>

                        <div className={styles.itemContainer}>
                            <div className={`${styles.item} ${styles.readonly}`}>
                                <p><strong>아이디</strong></p><p>{mentee?.id}</p>
                            </div>

                            <div className={`${styles.item}`}>
                                <p><strong>닉네임</strong></p>
                                <input 
                                name="nickname"
                                placeholder="변경할 닉네임을 입력하세요"
                                value={formData?.nickname}
                                onChange={handleChange}/>
                            </div>
                            <div className={`${styles.item}`}>
                                <p><strong>이메일</strong></p>
                                <input 
                                name="email"
                                placeholder="변경할 이메일을 입력하세요"
                                value={formData?.email}
                                onChange={handleChange}/>
                            </div>

                            <div className={`${styles.item}`}>
                                <p><strong>희망 직무</strong></p>
                                <input 
                                name="position"
                                placeholder="변경할 직무를 입력하세요"
                                value={`${
                                    Array.isArray(formData?.position) 
                                    ? formData?.position.join(", ") // Mentee의 position 처리
                                    : ""     // Mentor의 position 처리
                                }`}
                                onChange={handleChange}/>
                            </div>
                        </div>

                        <div className={styles.buttonContainer}>
                            <button className={styles.editBtn}>수정</button>
                            <button className={styles.cancelBtn} onClick={() => {router.push("/my")}}>취소</button>
                        </div>
                   
                       
                    </div>
               
                </form>
            </main>
        )
    }


 
}

export default Edit;

