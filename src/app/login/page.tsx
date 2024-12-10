"use client"

import { useState } from 'react';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import styles from "./login.module.scss";
import axios from 'axios';

const Login: React.FC = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [userType, setUserType] = useState("mentor");

  // 아이디 입력 핸들러
  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  // 비밀번호 입력 핸들러
  const handlePwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
  };

  // 역할 선택 핸들러
  const handleUserTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserType(e.target.value);
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
              withCredentials: true,    // 쿠키 포함
            }
          );
          
          console.log("res : ", res);
            console.log(data);
            
        } catch (error) {
            console.error("로그인 실패 : ", error);
        }
}

  return (
    <main>
      <form>
        <div className={styles.userType}>
          <label className={userType === "mentor" ? styles.selected : ""}>
            <strong>멘토</strong>
            <input
              type="radio"
              name="userType"
              value="mentor"
              checked={userType === "mentor"}
              onChange={(e) => setUserType(e.target.value)}
            />
          </label>
          <label className={userType === "mentee" ? styles.selected : ""}>
            <strong>멘티</strong>
            <input
              type="radio"
              name="userType"
              value="mentee"
              checked={userType === "mentee"}
              onChange={(e) => setUserType(e.target.value)}
            />
          </label>
        </div>
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
              <p>아이디 찾기</p>
              <span className={styles.span}> | </span>
              <p>비밀번호 찾기</p>
            </div>
            <p className={styles.signup}>
              <strong>회원가입</strong>
            </p>
          </div>
          <button
            className={`${styles.inputContainer} ${styles.btnLogin}`}
            onClick={handleLogin}
          >
            <strong>로그인</strong>
          </button>
        </div>
      </form>
    </main>
  );
}


export default Login;