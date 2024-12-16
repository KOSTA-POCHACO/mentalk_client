"use client";

import Modal from "@/components/Modal";
import styles from "./edit.module.scss"
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import CustomButton from "@/components/CustomButton";
import { useUserContext } from "@/context/UserContext";

const Edit : React.FC = () => {
    const router = useRouter();

    const { user, checkAccessToken } = useUserContext();

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const [imgSrc, setImgSrc] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null); 

    useEffect(() => {
        setFormData(user);
        setImgSrc( user?.profileImg ? `${API_URL}/${user?.profileImg}` : "/images/default_profile.png")
    }, [])

    const [modalMessage, setModalMessage] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);


    const [formData, setFormData] = useState<Partial<Mentor | Mentee | null>>({});

 
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

        const data = new FormData();

        if (fileInputRef.current?.files?.[0]) {
            // 프로필 이미지
            data.append(`${user?.type.toLowerCase()}_img`, fileInputRef.current.files[0]); 
        }

        // 다른 폼 데이터 추가
        data.append(`${user?.type.toLowerCase()}_nickname`, formData?.nickname || "");
        data.append(`${user?.type.toLowerCase()}_email`, formData?.email || "");


        // 변경 요청
        axios.put(`${API_URL}/${user?.type}/${user?.id}`, 
            data,
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        ).then((result) => {
            // 모달 띄우기
            setModalMessage(result.data.message);
            setIsModalOpen(true);
            
            // 끝나고 여기 유저 정보를 새로 불러와야되는데 그걸 어케 하지?
            checkAccessToken();


            
        }).catch((error) => {
            console.log(error);
        })


    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // 파일 가져오기
        const file = e.target.files?.[0]; 
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                // 미리보기 이미지
                setImgSrc(reader.result as string); 
                setFormData((prevState) => ({
                    ...prevState,
                }));

                console.log(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

   
    // 멘토면
    if(user?.type === "Mentor"){
        // 멘토로 타입 변환
        const mentor = user as Mentor;

        // 멘토 마이페이지
        return (
            <>
            {
                isModalOpen ? 
                <Modal 
                title="유저 수정" 
                content={modalMessage} 
                onConfirmClick={() => {router.push("/my")}} 
                onCancelClick={() => {setIsModalOpen(false)}}/> 
                : 
                ""
            }
            <main>
                <form 
                className={styles.wrap} 
                onSubmit={(e) => {e.preventDefault(); handleSubmit(e)}} 
                method="put" 
                encType="multipart/form-data">
                    <div className={styles.profileContainer}>
                        <div className={styles.profileImg} onClick={() => fileInputRef.current?.click()}>
                            <p>사진 변경</p>
                            <img src={imgSrc || "/images/default_profile.png"} alt="" />
                        </div>
                        {/* <CustomButton content="사진 변경" onClick={() => {}}/> */}
                        <input 
                        ref={fileInputRef} 
                        type="file" 
                        name="profileImg" 
                        id="" 
                        style={{display: "none"}} 
                        onChange={handleFileChange} 
                        accept="image/*"/>
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

                        <CustomButton 
                        content="수정" 
                        onClick={() => {}}/>
                        <CustomButton 
                        content="취소" 
                        onClick={() => {router.push("/my")}} 
                        backgroundColor="lightgray" 
                        color="black"/>
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
            <>
            {
                isModalOpen ? 
                <Modal 
                title="유저 수정" 
                content={modalMessage} 
                onConfirmClick={() => {router.push("/my")}} 
                onCancelClick={() => {setIsModalOpen(false)}}/> 
                : 
                ""
            }
            <main>
                <form 
                className={styles.wrap} 
                onSubmit={(e) => {e.preventDefault(); handleSubmit(e);}} 
                method="put"
                encType="multipart/form-data">
                    <div className={styles.profileContainer}>
                        <div className={styles.profileImg}>
                            <img src={imgSrc || "/images/default_profile.png"} alt="" />
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
                            <CustomButton content="수정" onClick={() => {}}/>
                            <CustomButton content="취소" onClick={() => {router.push("/my")}} backgroundColor="lightgray" color="black"/>
                        </div>
                   
                       
                    </div>
               
                </form>
            </main>
            </>

        )
    }


 
}

export default Edit;

