"use client"

import { useEffect, useState } from "react";
import styles from "../introduce.module.scss"
import { redirect, useRouter } from "next/navigation";
import axios from "axios";
import CustomButton from "@/components/CustomButton";
import { useUserContext } from "@/context/UserContext";
import Modal from "@/components/Modal";

const IntroduceWrite : React.FC = () => {

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const router = useRouter();
    const { user, isLogin, checkAccessToken } = useUserContext();

    const [modalData, setModalData] = useState({
        title : "",
        content : "",
        onConfirmClick : () => {},
        onCancelClick : () => {}
    })

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        title : "",
        content : "",
        tag : []
    });


    useEffect(() => {
        // 토큰 검증
        checkAccessToken();

        // 로그인 안 되어있으면
        if(!isLogin){
            setModalData({
                title: "잘못된 접근입니다",
                content : "경로가 올바르지 않습니다.",
                onConfirmClick : () => router.push("/login"),
                onCancelClick : () => router.back(),
            })
            setIsModalOpen(true);
        }
    }, [])

    function handleSubmit(){

        const data = {
            introduce_title : formData.title,
            introduce_content : formData.content
        }

        axios.post(`${API_URL}/introduce/${user?.id}`, data)
        .then((result) => {
            console.log(result);
            setModalData({
                title: "소개글 등록",
                content : result.data.message,
                onConfirmClick : () => redirect("/my/introduce"),
                onCancelClick : () => redirect("/my/introduce")
            })

            setIsModalOpen(true);
        }).catch((error) => {
            setModalData({
                title: "소개글 등록",
                content : error.data.message,
                onConfirmClick : () => redirect("/my/introduce"),
                onCancelClick : () => setIsModalOpen(false)
            })
        }).finally(() => {

        })

    }

    function handleClickInit(){
   
        setModalData({
            title: "소개글 초기화",
            content : "작성된 소개글이 초기화됩니다. 진행하시겠습니까?",
            onConfirmClick : () => {
                setFormData((prevState) => ({
                    ...prevState,
                    content : ""
                }));
                setIsModalOpen(false);
            }, 
            onCancelClick : () => setIsModalOpen(false)
        })
        setIsModalOpen(true);
    }

    function handleChange(e : React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {

        const { name, value } = e.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        console.log(formData);

    }


    return (
        <>
          <div className={styles.wrap}>
            {
                isModalOpen ? <Modal title={modalData.title} content={modalData.content} onConfirmClick={modalData.onConfirmClick} onCancelClick={modalData.onCancelClick}/>
                :
                ""
            }
                    <h1>소개글 작성</h1>

                    <div className={styles.inputContainer}>
                        <input type="text" value={formData.title} name="title" onChange={handleChange} placeholder="제목을 입력해주세요"/>
                        <textarea value={formData.content} name="content" onChange={handleChange} placeholder="내용을 입력해주세요"></textarea>
                    </div>
                    <div className={styles.buttonContainer}>
                        <CustomButton content="작성" onClick={handleSubmit}/>
                        <CustomButton content="초기화" backgroundColor="lightgray" color="black" onClick={handleClickInit}/>
                    </div>
                </div>
        </>
    )
}

export default IntroduceWrite