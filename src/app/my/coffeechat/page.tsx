"use client";

import { useEffect, useState } from "react";
import styles from "./coffeechat.module.scss";
import axios from "axios";
import { useUserContext } from "@/context/UserContext";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "next/navigation";

const CoffeeChatPage: React.FC = () => {
  const router = useRouter();

  const { user } = useUserContext();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [coffeechatList, setCoffeechatList] = useState<any[]>([]);

  useEffect(() => {
    const newCoffeechatList: any[] = [];
    if (user?.type === "Mentor") {
      axios
        .get(`${API_URL}/coffeechat/mentor/${user?.id}`)
        .then(async (result) => {
          await result.data.data.map((el: any) => {
            const newCoffeechat = {
              coffeechatId: el.coffeechat.coffeechat_id,
              introduceId: el.coffeechat.coffeechat_introduce_id,
              wanted: el.coffeechat.coffeechat_coffee_wanted,
              status: el.coffeechat.coffeechat_status,
              meetingDate: el.coffeechat.coffeechat_meeting_date,
              mentorNickname: el.mentor.mentor_nickname,
              menteeNickname: el.mentee.mentee_nickname,
            };

            newCoffeechatList.push(newCoffeechat);
          });

          setCoffeechatList(newCoffeechatList);

          console.log("newCoffeechatList");
          console.log(newCoffeechatList);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (user?.type === "Mentee") {
      axios
        .get(`${API_URL}/coffeechat/mentee/${user?.id}`)
        .then(async (result) => {
          await result.data.data.map((el: any) => {
            const newCoffeechat = {
              coffeechatId: el.coffeechat.coffeechat_id,
              introduceId: el.coffeechat.coffeechat_introduce_id,
              wanted: el.coffeechat.coffeechat_coffee_wanted,
              status: el.coffeechat.coffeechat_status,
              meetingDate: el.coffeechat.coffeechat_meeting_date,
              mentorNickname: el.mentor.mentor_nickname,
              menteeNickname: el.mentee.mentee_nickname,
            };

            newCoffeechatList.push(newCoffeechat);
          });

          setCoffeechatList(newCoffeechatList);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  function handleAcceptClick(coffeechatId: string) {
    const data = {
      coffee_status: "진행",
    };

    axios
      .put(`${API_URL}/coffeechat/${coffeechatId}`, data)
      .then((result) => {
        console.log("커피챗이 수정되었습니다");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleDeniedClick(coffeechatId: string) {
    const data = {
      coffee_status: "취소",
    };
    axios
      .put(`${API_URL}/coffeechat/${coffeechatId}`, data)
      .then((result) => {
        console.log("커피챗이 수정되었습니다");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.titleContainer}>
          {/* <div className={styles.title}>내 커피챗 목록</div> */}
        </div>
        <div className={styles.coffeechatContainer}>
          <table className={styles.tableContainer}>
            <thead>
              <tr>
                <th>소개글</th>
                <th>{user?.type === "Mentor" ? "멘티" : "멘토"}</th>
                <th>날짜</th>
                <th>상태</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {coffeechatList.map((coffeechat) => (
                <tr key={coffeechat.coffeechat_id}>
                  <td>
                    <p className={styles.titleContainer}>
                      막연하게 느껴지는 서비스 기획, 핵심은 “이것"입니다
                      {coffeechat.title}
                    </p>
                  </td>
                  <td>
                    <div className={styles.nicknameFrame}>
                      {coffeechat.menteeNickname}
                    </div>
                  </td>
                  <td>
                    <div className={styles.dateFrame}>
                      {new Date(coffeechat.meetingDate).toLocaleDateString()}
                      &nbsp;
                      {new Date(coffeechat.meetingDate).toLocaleTimeString()}
                    </div>
                  </td>
                  <td>
                    <div
                      className={`${styles.status} 
                                        ${coffeechat.status === "신청" ? styles.register : ""}
                                        ${coffeechat.status === "진행" ? styles.ongoing : ""}
                                        ${coffeechat.status === "취소" ? styles.cancel : ""}
                                        ${coffeechat.status === "완료" ? styles.done : ""}
                                        `}
                    >
                      <p
                        className={`${styles.statusColor}
                                                ${coffeechat.status === "신청" ? styles.register : ""}
                                                ${coffeechat.status === "진행" ? styles.ongoing : ""}
                                                ${coffeechat.status === "취소" ? styles.cancel : ""}
                                                ${coffeechat.status === "완료" ? styles.done : ""}
                                            
                                            `}
                      ></p>
                      {coffeechat.status}
                    </div>
                  </td>
                  <td>
                    {coffeechat.status === "신청" ? (
                      <div className={styles.buttonContainer}>
                        <CustomButton
                          content="수락"
                          onClick={() => {
                            handleAcceptClick(coffeechat.coffeechatId);
                          }}
                        />
                        <CustomButton
                          content="거절"
                          backgroundColor="var(--danger-color)"
                          onClick={() => {
                            handleDeniedClick(coffeechat.coffeechatId);
                          }}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                    {coffeechat.status === "진행" || coffeechat.status === "완료" ? (
                      <CustomButton
                        content="커피챗 입장하기"
                        onClick={() => {
                          router.push(
                            `/my/chatting/${coffeechat.coffeechatId}`,
                          );
                        }}
                      />
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {coffeechatList.length === 0 || !coffeechatList ? (
            <div className={styles.messageContainer}>
              등록된 커피챗이 없습니다.
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default CoffeeChatPage;
