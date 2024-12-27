"use client"

import { useEffect, useState } from 'react';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import styles from "./login.module.scss";
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import SelectUserType from "@/components/SelectUserType";
import { useUserContext } from '@/context/UserContext';
import Modal from '@/components/Modal';

const Login: React.FC = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const router = useRouter();
  const { userType, setUserType, isLogin, setIsLogin, setUser, logOut } = useUserContext();
  
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
      e.preventDefault();
      try {
          const data = userType === "mentor"
              ? { mentor_id: id, mentor_pw: pw }
              : { mentee_id: id, mentee_pw: pw };

          await axios.post(
              `http://localhost:8080/login/${userType}`,
              data,
              { withCredentials: true }
          );

          const result = await axios.get(
              `http://localhost:8080/login/${userType}/success`,
              { withCredentials: true }
          );

          setIsLogin(true);
          setUser(result.data, userType);
          setUserType(userType);
          router.push("/with/us");
      } catch (error) {
          // console.error("로그인 실패 : ", error);
          alert("아이디 또는 비밀번호가 일치하지 않습니다.");
          setId("");
          setPw("");
      }
  };

  if (isLogin) {
    return (
        <Modal
          title="접근 오류"
          content="이미 로그인 상태입니다. 로그아웃 하시겠습니까?"
          onConfirmClick={logOut}
          onCancelClick={() => router.push("/with/us")}
        />
    )
  }

  return (
    <>
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
    </>
  );
}


export default Login;