import axios from "axios";
import styles from "./coffeechat.module.scss"
import { useState } from "react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import CustomButton from "./CustomButton";



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

    const router = useRouter();

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

    function handleClick(coffeechatId : string) {
        router.push(`/my/chatting/${coffeechatId}`);
    }
    

    return (
        <>
            {
                isModalOpen ? 
                <Modal title={modalData.title} content={modalData.content} onConfirmClick={modalData.onConfirmClick} onCancelClick={modalData.onCancelClick}/> 
                : ""
            }
            <div className={styles.wrap}>
              
                <div className={styles.userContainer}>
                    <div className={styles.profileContainer}>
                        <div className={styles.profileFrame}>
                            <img src="/images/default_profile.png" alt="" />
                        </div>
                        <div className={styles.nicknameFrame}>
                            여기에멘티닉네임
                        </div>
                    </div>
                   
                    <div className={styles.statusContainer}>
                        <div className={styles.status}><p className={styles.statusColor}></p>{status}</div>
                    </div>
                </div>
                
                <div className={styles.infoContainer}>
                        {/* <p>커피챗id: {coffeechat_id}</p> */}
                        {/* <p>멘토: {mentor_id}</p> */}
                        {/* <p>멘티: {mentee_id}</p> */}
                        {/* <div>소개글: {introduce_id}</div> */}
                        {/* <div>커피챗 날짜: {meeting_date}</div> */}
                        
                        <div className={styles.titleContainer}>소개글 제목 막연하게 느껴지는 서비스 기획, 핵심은 “이것"입니다이것저것요것이것저것요것</div>
                        <div className={styles.dateContainer}>2024. 12. 25 오전 10:00</div>
                        <div className={styles.tagContainer}>
                            {
                                wanted.map((tag) => 
                                     <p className={styles.tag}>{tag}</p>
                                )
                            }
                        </div>
                       
                </div>
                <div className={styles.buttonContainer}>
                {
                    status === "신청" ? 
                    <>
                        <CustomButton content="수락" onClick={onAcceptClick}/>
                        <CustomButton backgroundColor="lightgray" color="black" content="거절" onClick={onDeniedClick}/>
                    </>
                    :
                    ""
                }
                {
                    status === "진행중" ?
                    <>
                        <CustomButton content="채팅방 입장" onClick={() => {handleClick(coffeechat_id)}}/>
                        <CustomButton content="종료" onClick={() => {}}/>
                    </>
                    :
                    ""
                }
                {

                }
                </div>

            </div>
        </>
    )
}

export default Coffeechat;