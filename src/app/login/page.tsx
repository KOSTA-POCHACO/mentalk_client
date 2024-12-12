"use client"

import { useState } from 'react';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import styles from "./login.module.scss";
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import UserType from "@/components/UserType";
import { useUserContext } from '@/context/UserContext';

const Login: React.FC = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [userType, setUserType] = useState("mentor");
  const router = useRouter();
  const { setUser } = useUserContext();

  // 아이디 입력 핸들러
  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  // 비밀번호 입력 핸들러
  const handlePwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
  };
  
// 로그인 요청 핸들러
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault(); // 폼 제출 시 페이지 리로드 방지

        try {
            // userType에 따라 데이터를 다르게 설정
            const data =
                userType === "mentor"
                    ? { mentor_id: id, mentor_pw: pw } // 멘토일 때
                    : { mentee_id: id, mentee_pw: pw }; // 멘티일 때

            // 로그인 요청
            const res = await axios.post(
                `http://localhost:8080/login/${userType}`,
                data,
                {
                    withCredentials: true, // 쿠키 포함
                }
            );

            // 로그인 성공 시 리다이렉트
            if (res.status === 200) {
              const userData = res.data.data;

              const newUser =
                userType === "mentor"
                  ? {
                      type: "Mentor",
                      id: userData.mentor_id,
                      email: userData.mentor_email,
                      profileImg: userData.mentor_img,
                      nickname: userData.mentor_nickname,
                      phone: userData.mentor_phone,
                      company: userData.mentor_company,
                      category: userData.mentor_category,
                      position: userData.mentor_position,
                      career: userData.mentor_career,
                      isChecked: userData.mentor_is_checked,
                      warningCount: userData.mentor_warning_count,
                      favoriteCount: userData.mentor_favorite_count,
                      gender: userData.mentor_gender,
                      joinDate: userData.mentor_joinDate,
                      suspension: userData.mentor_suspension,
                      paperImg: userData.mentor_paper_img,
                    }
                  : {
                      type: "Mentee",
                      id: userData.mentee_id,
                      email: userData.mentee_email,
                      profileImg: userData.mentee_img,
                      nickname: userData.mentee_nickname,
                      phone: userData.mentee_phone,
                      wish: userData.mentee_position,
                      gender: userData.mentee_gender,
                      joinDate: userData.mentee_createdAt,
                      suspension: userData.mentee_suspension,
                  };
              
              // Context에 저장
              setUser(newUser);

              // 로그인 성공 후 리다이렉트
              router.push("/with/us");
            }
            
        } catch (error) {
            console.error("로그인 실패 : ", error);
        }
    };

  return (
    <main>
      <form onSubmit={handleLogin}>
        <UserType/>
        <div className={styles.loginContainer}>
          <div className={styles.inputContainer}>
            <FaUser className={styles.icon} />
            <input
              className={styles.input}
              type="text"
              placeholder="아이디"
              value={id}
              onChange={handleIdChange}
            />
          </div>
          <div className={styles.inputContainer}>
            <RiLockPasswordFill className={styles.icon} />
            <input
              className={styles.input}
              type="password"
              placeholder="비밀번호"
              value={pw}
              onChange={handlePwChange}
            />
          </div>
          <div className={styles.linkContainer}>
            <div className={styles.findContainer}>
              아이디 찾기
              <span className={styles.span}> | </span>
              비밀번호 찾기
            </div>
            <Link href="/signup">
              <p className={styles.signup}>
                <strong>회원가입</strong>
              </p>
            </Link>
          </div>
          <button
            type='submit'
            className={`${styles.inputContainer} ${styles.btnLogin}`}
          >
            <strong>로그인</strong>
          </button>
        </div>
      </form>
    </main>
  );
}


export default Login;