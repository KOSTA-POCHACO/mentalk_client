"use client"

import { useUserContext } from "@/context/UserContext";
import styles from "./introduce.module.scss"
import useIntroduceData from "@/hook/useIntroduce";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import CustomButton from "@/components/CustomButton";
import axios from "axios";

const Introduce : React.FC = () => {

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const { user } = useUserContext();
    const [introduce, setIntroduce] = useState<Introduce | null>(null);
    const introduceData = useIntroduceData();
    
    const [modalData, setModalData] = useState({
        title : "",
        content : ""
    })

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalConfirm, setModalConfirm] = useState<() => void>(() => {});
    const [formData, setFormData] = useState({
        title : "제목",
        content : "내용",
    });

    useEffect(() => {
        if(introduceData){
            setIntroduce(introduceData);
        }else{
            setModalConfirm(() => {
                return () => {
                    setIsModalOpen(false);
                }
            })
            setModalData({
                title: "소개글 불러오기 실패",
                content : "작성된 소개글이 없습니다. 소개글을 작성해주세요."
            })
            setIsModalOpen(true);
        }
        console.log(user);



    }, []);

    function handleSubmit(){

        const data = {
            title : formData.title,
            content : formData.content
        }

        axios.post(`${API_URL}/introduce/${user?.id}`, data)
        .then((result) => {
            
        })

    }

    function handleClickInit(){
   
        setModalData({
            title: "소개글 초기화",
            content : "작성된 소개글이 초기화됩니다. 진행하시겠습니까?"
        })
        setModalConfirm(() => {
            return () => {
                setFormData((prevState) => ({
                    ...prevState,
                    content : ""
                }));
                setIsModalOpen(false);
            } 
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
        <main>
            {
                isModalOpen ? <Modal title={modalData.title} content={modalData.content} onConfirmClick={modalConfirm} onCancelClick={() => {setIsModalOpen(false)}}/> : ""
            }
          
            {
                introduce ? <div className={styles.wrap}>
                <div className={styles.titleContainer}>
                    <div className={styles.title}>{introduce?.title}</div>
                </div>

                <div className={styles.infoContainer}>
                    <p>{user?.nickname}</p>
                    <p>{introduce?.coffeechatCount}회</p>
                    <p>{"⭐️ ".repeat(introduce ? introduce?.rating : 0)}</p>
                </div>

                <div className={styles.content}>
                    <div>{introduce?.content}</div>

                </div>
                </div>
                :
                // 소개글 없을 때
                <>
                <div className={styles.wrap}>
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
            }
        
          
        </main>
        </>

    )
}

export default Introduce;