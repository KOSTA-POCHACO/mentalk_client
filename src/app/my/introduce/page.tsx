"use client";

import { useUserContext } from "@/context/UserContext";
import styles from "./introduce.module.scss";
import useIntroduceData from "@/hook/useIntroduce";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import CustomButton from "@/components/CustomButton";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";

const Introduce: React.FC = () => {
  const router = useRouter();

  const { user, userType, checkAccessToken, isLogin } = useUserContext();
  const [introduce, setIntroduce] = useState<Introduce | null>(null);
  const introduceData = useIntroduceData();
  const [isLoading, setIsLoading] = useState(true);

  const [modalData, setModalData] = useState({
    title: "",
    content: "",
    onConfirmClick: () => {},
    onCancelClick: () => {},
  });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    // 토큰 검증
    checkAccessToken();

    // 로그인 안 되어있으면
    if (!isLogin) {
      setModalData({
        title: "잘못된 접근입니다",
        content: "경로가 올바르지 않습니다.",
        onConfirmClick: () => router.push("/login"),
        onCancelClick: () => router.back(),
      });
      setIsModalOpen(true);
    }

    // 멘티면 튕겨냄
    if (userType === "mentee") {
      setModalData({
        title: "잘못된 접근입니다",
        content: "경로가 올바르지 않습니다.",
        onConfirmClick: () => router.push("/my"),
        onCancelClick: () => router.push("/my"),
      });
      setIsModalOpen(true);
    }
  }, []);

  useEffect(() => {
    if (introduceData) {
      setIntroduce(introduceData);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [introduceData]);

  useEffect(() => {
    if (!introduce) {
      setModalData({
        title: "불러오기 오류",
        content: "작성된 소개글이 없습니다. 작성하시겠습니까?",
        onConfirmClick: () => router.push("/my/introduce/write"),
        onCancelClick: () => router.push("/my"),
      });
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [introduce]);

  if (!isLogin) {
    return (
      <>
        {isModalOpen ? (
          <Modal
            title={modalData.title}
            content={modalData.content}
            onConfirmClick={modalData.onConfirmClick}
            onCancelClick={modalData.onCancelClick}
          />
        ) : (
          ""
        )}
      </>
    );
  }

  return (
    <>
      {isModalOpen ? (
        <Modal
          title={modalData.title}
          content={modalData.content}
          onConfirmClick={modalData.onConfirmClick}
          onCancelClick={modalData.onCancelClick}
        />
      ) : (
        ""
      )}

      {introduce ? (
        <div className={styles.wrap}>
          <div className={styles.titleContainer}>
            <div className={styles.title}>{introduce?.title}</div>
          </div>

          <div className={styles.infoContainer}>
            {/* <p>{user?.nickname}</p> */}
            {/* <p>{introduce?.coffeechatCount}회</p> */}
            <p>{"⭐️ ".repeat(introduce ? introduce?.rating : 0)}</p>
          </div>

          <div className={styles.content}>
            <div>{introduce?.content}</div>
          </div>
          <div className={styles.buttonContainer}>
            <CustomButton
              content="수정"
              onClick={() => {
                router.push("/my/introduce/edit");
              }}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Introduce;
