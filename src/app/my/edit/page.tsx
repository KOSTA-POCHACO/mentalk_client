"use client";

import styles from "./edit.module.scss"
import useUserData from "@/hook/useUserData";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Edit : React.FC = () => {
    const router = useRouter();


    const [user, setUser] = useState<Mentor | Mentee | null>(null);
    const userData = useUserData();

    useEffect(() => {
        setUser(userData);
        setFormData(userData);
    }, [userData])


    const [formData, setFormData] = useState<Partial<Mentor | Mentee | null>>(null);

 
    function handleChange (e :React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;

        if(name == "wish"){
            const updateWish = value.split(",").map((item) => item.trim());

            console.log(updateWish);

            if(updateWish.length > 3){
                alert("희망 직무는 세개까지만 등록할 수 있습니다.");
                return;
            }

            setFormData((prevState) => ({
                ...prevState,
                wish : updateWish,
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

    function handleSubmit () {
    }
   
    // 멘토면
    if(user?.type === "Mentor"){
        // 멘토로 타입 변환
        const mentor = user as Mentor;

        // 멘토 마이페이지
        return (
            <main>
                <form className={styles.wrap} >
                    <div className={styles.profileContainer}>
                        <div className={styles.profileImg}>
                        </div>
                    </div>
    
                    <div className={styles.infoContainer}>

                        <div className={styles.itemContainer}>
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
                        <button className={styles.editBtn} onClick={handleSubmit}>수정</button>
                        <button className={styles.cancelBtn} onClick={() => {router.push("/my")}}>취소</button>
                    </div>
               
                 
                    </div>
                 
                </form>
            </main>
        )
    }

    // 멘티면 
    if(user?.type === "Mentee"){
        // 멘티로 타입 변환
        const mentee = user as Mentee;

        // 멘티 마이페이지
        return (
            <main>
                <div className={styles.wrap}>
                    <div className={styles.profileContainer}>
                        <div className={styles.profileImg}>
                        </div>
                        수정테스트
                    </div>


                    <div className={styles.infoContainer}>

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
                            <p><strong>희망 직무</strong></p>
                            <input 
                            name="wish"
                            placeholder="변경할 닉네임을 입력하세요"
                            value={`${formData?.wish?.join(", ")}`}
                            onChange={handleChange}/>
                        </div>
                       
                    </div>
                      

                    <div className={styles.wishContainer}>
                       
                    </div>
                    <div className={styles.buttonContainer}>
                        <button className={styles.editBtn} onClick={() => {handleSubmit}}>수정</button>
                        <button className={styles.cancelBtn} onClick={() => {router.push("/my")}}>취소</button>
                    </div>
               
                </div>
            </main>
        )
    }


 
}

export default Edit;

