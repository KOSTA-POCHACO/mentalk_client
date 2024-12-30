"use client";

import Modal from "@/components/Modal";
import styles from "./edit.module.scss";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import CustomButton from "@/components/CustomButton";
import { useUserContext } from "@/context/UserContext";

const Edit: React.FC = () => {
  const router = useRouter();

  const { user, checkAccessToken, userType } = useUserContext();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFormData(user);
    setImgSrc(
      user?.profileImg
        ? `${API_URL}/${user?.profileImg}`
        : "/images/default_profile.png",
    );
  }, []);

  const [modalMessage, setModalMessage] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [formData, setFormData] = useState<Partial<Mentor | Mentee | null>>({
    position: [],
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    console.log(formData);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = new FormData();

    if (fileInputRef.current?.files?.[0]) {
      // 프로필 이미지
      data.append(
        `${user?.type.toLowerCase()}_img`,
        fileInputRef.current.files[0],
      );
    }

    if (userType === "mentee") {
      console.log(JSON.stringify(formData?.position));
      data.append(`mentee_position`, JSON.stringify(formData?.position || []));
    }

    // 다른 폼 데이터 추가
    data.append(
      `${user?.type.toLowerCase()}_nickname`,
      formData?.nickname || "",
    );
    data.append(`${user?.type.toLowerCase()}_email`, formData?.email || "");

    // 변경 요청
    axios
      .put(`${API_URL}/${user?.type.toLowerCase()}/${user?.id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((result) => {
        // 모달 띄우기
        setModalMessage(result.data.message);
        setIsModalOpen(true);

        // 수정 성공하면 context 유저 정보 갱신
        checkAccessToken();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
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
  }

  function addWish(selectedPosition: string) {
    setFormData((prevState) => {
      // prevState가 null인 경우 초기값 설정
      const currentPosition = prevState?.position || [];
      return {
        ...prevState,
        position: currentPosition.includes(selectedPosition)
          ? currentPosition.filter((el) => el !== selectedPosition) // 이미 존재하면 추가하지 않음
          : [...currentPosition, selectedPosition], // 새로운 항목 추가
      };
    });

    console.log(formData);
  }

  // 멘토면
  if (user?.type === "Mentor") {
    // 멘토로 타입 변환
    const mentor = user as Mentor;

    // 멘토 마이페이지
    return (
      <>
        {isModalOpen ? (
          <Modal
            title="유저 수정"
            content={modalMessage}
            onConfirmClick={() => {
              router.push("/my");
            }}
            onCancelClick={() => {
              setIsModalOpen(false);
            }}
          />
        ) : (
          ""
        )}
        <>
          <form
            className={styles.wrap}
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
            method="put"
            encType="multipart/form-data"
          >
            <div className={styles.profileContainer}>
              <div
                className={styles.profileImg}
                onClick={() => fileInputRef.current?.click()}
              >
                <p>사진 변경</p>
                <img src={imgSrc || "/images/default_profile.png"} alt="" />
              </div>
              <input
                ref={fileInputRef}
                type="file"
                name="profileImg"
                id=""
                style={{ display: "none" }}
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>

            <div className={styles.infoContainer}>
              <div className={styles.itemContainer}>
                <h3>기본 정보</h3>
                <div className={`${styles.item} ${styles.readonly}`}>
                  <p>
                    <strong>아이디</strong>
                  </p>
                  <p>{mentor?.id}</p>
                </div>

                <div className={`${styles.item}`}>
                  <p>
                    <strong>닉네임</strong>
                  </p>
                  <input
                    name="nickname"
                    placeholder="변경할 닉네임을 입력하세요"
                    value={formData?.nickname}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.item}>
                  <p>
                    <strong>이메일</strong>
                  </p>
                  <input
                    type="email"
                    name="email"
                    placeholder="변경할 이메일을 입력하세요"
                    value={formData?.email}
                    onChange={handleChange}
                  />
                </div>

                <br></br>
                <h3>직무</h3>
                <div className={`${styles.item} ${styles.readonly}`}>
                  <p>
                    <strong>소속</strong>
                  </p>
                  <p>{mentor?.company}</p>
                </div>
                <div className={`${styles.item} ${styles.readonly}`}>
                  <p>
                    <strong>카테고리</strong>
                  </p>
                  <p>{mentor?.category}</p>
                </div>
                <div className={`${styles.item} ${styles.readonly}`}>
                  <p>
                    <strong>직무</strong>
                  </p>
                  <p>{mentor?.position}</p>
                </div>
              </div>

              <div className={styles.buttonContainer}>
                <CustomButton content="수정" onClick={() => {}} />
                <CustomButton
                  content="취소"
                  onClick={() => {
                    router.push("/my");
                  }}
                  backgroundColor="lightgray"
                  color="black"
                />
              </div>
            </div>
          </form>
        </>
      </>
    );
  }

  // 멘티면
  if (user?.type === "Mentee") {
    // 멘티로 타입 변환
    const mentee = user as Mentee;

    // 멘티 마이페이지
    return (
      <>
        {isModalOpen ? (
          <Modal
            title="유저 수정"
            content={modalMessage}
            onConfirmClick={() => {
              router.push("/my");
            }}
            onCancelClick={() => {
              setIsModalOpen(false);
            }}
          />
        ) : (
          ""
        )}
        <main>
          <form
            className={styles.wrap}
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
            method="put"
            encType="multipart/form-data"
          >
            <div className={styles.profileContainer}>
              <div
                className={styles.profileImg}
                onClick={() => fileInputRef.current?.click()}
              >
                <p>사진 변경</p>
                <img src={imgSrc || "/images/default_profile.png"} alt="" />
              </div>
              {/* <CustomButton content="사진 변경" onClick={() => {}}/> */}
              <input
                ref={fileInputRef}
                type="file"
                name="profileImg"
                id=""
                style={{ display: "none" }}
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>
            <div className={styles.infoContainer}>
              <div className={styles.itemContainer}>
                <div className={`${styles.item} ${styles.readonly}`}>
                  <p>
                    <strong>아이디</strong>
                  </p>
                  <p>{mentee?.id}</p>
                </div>

                <div className={`${styles.item}`}>
                  <p>
                    <strong>닉네임</strong>
                  </p>
                  <input
                    name="nickname"
                    placeholder="변경할 닉네임을 입력하세요"
                    value={formData?.nickname}
                    onChange={handleChange}
                  />
                </div>
                <div className={`${styles.item}`}>
                  <p>
                    <strong>이메일</strong>
                  </p>
                  <input
                    name="email"
                    placeholder="변경할 이메일을 입력하세요"
                    value={formData?.email}
                    onChange={handleChange}
                  />
                </div>

                <div className={`${styles.item}`}>
                  <p>
                    <strong>희망 직무</strong>
                  </p>

                  <div className={styles.positionContainer}>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addWish(e.currentTarget.innerText);
                      }}
                      className={`${formData?.position?.includes("프론트엔드 개발자") ? styles.active : ""}`}
                    >
                      프론트엔드 개발자
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addWish(e.currentTarget.innerText);
                      }}
                      className={`${formData?.position?.includes("백엔드 개발자") ? styles.active : ""}`}
                    >
                      백엔드 개발자
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addWish(e.currentTarget.innerText);
                      }}
                      className={`${formData?.position?.includes("데이터 엔지니어") ? styles.active : ""}`}
                    >
                      데이터 엔지니어
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addWish(e.currentTarget.innerText);
                      }}
                      className={`${formData?.position?.includes("풀스택 개발자") ? styles.active : ""}`}
                    >
                      풀스택 개발자
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addWish(e.currentTarget.innerText);
                      }}
                      className={`${formData?.position?.includes("웹 퍼블리셔") ? styles.active : ""}`}
                    >
                      웹 퍼블리셔
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addWish(e.currentTarget.innerText);
                      }}
                      className={`${formData?.position?.includes("UI/UX 디자이너") ? styles.active : ""}`}
                    >
                      UI/UX 디자이너
                    </button>
                  </div>
                  {/* <input
                    name="position"
                    placeholder="변경할 직무를 입력하세요"
                    value={`${
                      Array.isArray(formData?.position)
                        ? formData?.position.join(", ") // [position1, position2, position3]
                        : ""
                    }`}
                    onChange={handleChange}
                  /> */}
                </div>
              </div>

              <div className={styles.buttonContainer}>
                <CustomButton content="수정" onClick={() => {}} />
                <CustomButton
                  content="취소"
                  onClick={() => {
                    router.push("/my");
                  }}
                  backgroundColor="lightgray"
                  color="black"
                />
              </div>
            </div>
          </form>
        </main>
      </>
    );
  }
};

export default Edit;
