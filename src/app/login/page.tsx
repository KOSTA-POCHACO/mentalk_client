"use client"

import { useState } from 'react';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import styles from "./login.module.scss";
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import SelectUserType from "@/components/SelectUserType";
import { useUserContext } from '@/context/UserContext';

const Login: React.FC = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const router = useRouter();
  const { userType, setUserType, setIsLogin, setUser } = useUserContext();

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

        // userType에 따라 데이터를 다르게 설정
        const data =
          userType === "mentor"
              ? { mentor_id: id, mentor_pw: pw } // 멘토일 때
              : { mentee_id: id, mentee_pw: pw }; // 멘티일 때

        // 로그인 요청
        axios.post(
            `http://localhost:8080/login/${userType}`,
            data,
            {
                withCredentials: true, // 쿠키 포함
            }
        ).then(() => {
            // 로그인 성공 요청
            return axios({
              url: `http://localhost:8080/login/${userType}/success`,
              method: "GET",
              withCredentials: true,
            })
        }).then((result) => {
            // 로그인 성공
            setIsLogin(true);
            setUser(result.data, userType);
            // 로그인 성공 후 리다이렉트
            router.push("/with/us");

        }).catch((error) => {
          console.error("로그인 실패 : ", error);
        });

    };

  return (
    <main>
      <form onSubmit={handleLogin}>
        <SelectUserType/>
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