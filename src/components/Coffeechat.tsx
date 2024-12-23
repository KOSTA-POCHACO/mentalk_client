import axios from "axios";
import styles from "./coffeechat.module.scss"
import CustomButton from "./CustomButton";
import { useState } from "react";
import Modal from "./Modal";



interface coffeechatProps {
    coffeechat_id : string,
    mentor_id : string,
    mentee_id : string,
    introduce_id : string,
    meeting_date : string,
    wanted : string[],
    status : string,
}



const Coffeechat : React.FC<coffeechatProps> = ({coffeechat_id, mentor_id, mentee_id, introduce_id, meeting_date, wanted, status}) => {

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const [modalData, setModalData] = useState({
        title : "",
        content : "",
        onConfirmClick : () => {},
        onCancelClick : () => {}
    })

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    function onAcceptClick (){
        const data = {
            coffee_status : "진행"
        }
        axios.put(`${API_URL}/coffeechat/${coffeechat_id}`, data).then((result) => {
            console.log(result);
            setModalData({
                title : "커피챗 수락",
                content : result.data.message,
                onConfirmClick : () => setIsModalOpen(false),
                onCancelClick : () => setIsModalOpen(false),
            })
            setIsModalOpen(true);

        }).catch((error) => {
            console.log(error.response.data.error);
            setModalData({
                title : "커피챗 수락",
                content : error.response.data.error,
                onConfirmClick : () => setIsModalOpen(false),
                onCancelClick : () => setIsModalOpen(false),
            })
            setIsModalOpen(true);
        })
    }

    function onDeniedClick(){
        const data = {
            coffee_status : "취소"
        }

        axios.put(`${API_URL}/coffeechat/${coffeechat_id}`, data).then((result) => {
            setModalData({
                title : "커피챗 거절",
                content : result.data.message,
                onConfirmClick : () => setIsModalOpen(false),
                onCancelClick : () => setIsModalOpen(false),
            })
            setIsModalOpen(true);
        }).catch((error) => {
            console.log(error.response.data.error);
            setModalData({
                title : "커피챗 거절",
                content : error.response.data.error,
                onConfirmClick : () => setIsModalOpen(false),
                onCancelClick : () => setIsModalOpen(false),
            })
            setIsModalOpen(true);
        })
    }
    

    return (
        <>
        {
            isModalOpen ? 
            <Modal title={modalData.title} content={modalData.content} onConfirmClick={modalData.onConfirmClick} onCancelClick={modalData.onCancelClick}/> 
            : ""
        }
            <div className={styles.wrap}>
                <div className={styles.statusContainer}>
                    {
                        <p>{status}</p>
                    }
                </div>
                <div className={styles.infoContainer}>
                    <p>커피챗id: {coffeechat_id}</p>
                    <p>멘토: {mentor_id}</p>
                    <p>멘티: {mentee_id}</p>
                    <p>소개글: {introduce_id}</p>
                    <p>커피챗 날짜: {meeting_date}</p>
                    <p>키워드: {wanted.map((tag) => {
                        return tag;
                    })}</p>
                    {
                        status === "신청" ? 
                        (<div>
                            <CustomButton content="수락" onClick={onAcceptClick}/>
                            <CustomButton backgroundColor="lightgray" color="black" content="거절" onClick={onDeniedClick}/>
                        </div>)
                        :
                        ""
                     }
                     {
                         status === "진행중" ?
                         <div>
                            <CustomButton content="채팅방 입장" onClick={() => {}}/>
                            <CustomButton content="종료" onClick={() => {}}/>
                         </div>
                         :
                         ""
                     }

                </div>
               

            </div>
        </>
    )
}

export default Coffeechat;