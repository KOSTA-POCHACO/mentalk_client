"use client"

import Link from "next/link";
import styles from "./Nav.module.scss"
import { useEffect, useState } from "react";
import axios from "axios";
import { useUserContext } from "@/context/UserContext";

const Nav: React.FC = () => {
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const { user, setUser } = useUserContext();

    // 엑세스 토큰 유효성 검사
    useEffect(() => {
        const checkAccessToken = async () => {
        try {
            await axios({
                url: `http://localhost:8080/login/${user?.type}/accesstoken`,
                method: "GET",
                withCredentials: true,
            });
            // 엑세스 토큰이 유효한 경우 로그인 성공 요청
            getLoginSuccess();
        } catch (error) {
            console.log("엑세스 토큰 검증 실패:", error);
            // 엑세스 토큰이 유효하지 않으면 리프레시 토큰으로 새로운 엑세스 토큰을 발급받기
            refreshAccessToken();
        }
        };

        // 리프레시 토큰으로 새로운 엑세스 토큰 발급
        const refreshAccessToken = async () => {
        try {
            await axios({
                url: `http://localhost:8080/login/${user?.type}/refreshtoken`,
                method: "GET",
                withCredentials: true,
            });
            // 새로운 엑세스 토큰 발급 후 로그인 성공 요청
            getLoginSuccess();
        } catch (error) {
            console.log("리프레시 토큰으로 엑세스 토큰 발급 실패:", error);
        }
        };

        // 로그인 성공 요청
        const getLoginSuccess = async () => {
            try {
                const result = await axios({
                    url: `http://localhost:8080/login/${user?.type}/success`,
                    method: "GET",
                    withCredentials: true,
                });
                if (result.data) {
                  console.log("로그인 성공:", result.data); // 로그인 성공 데이터 확인
                  setIsLogin(true);
                  setUser(result.data);
                }
            } catch (error) {
                console.log("로그인 성공 요청 실패:", error);
            }
        };

        checkAccessToken();
    }, []);

    return (
      <nav className={styles.nav}>
        <section className={styles.wrap}>
          <div className={styles.leftMenu}>
            <div className={styles.logoContainer}>
              <svg
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                fillRule="evenodd"
                clipRule="evenodd"
              >
                <path d="M24 20h-3v4l-5.333-4h-7.667v-4h2v2h6.333l2.667 2v-2h3v-8.001h-2v-2h4v12.001zm-6-6h-9.667l-5.333 4v-4h-3v-14.001h18v14.001zm-13-8c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm4 0c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm4 0c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1z" />
              </svg>
              <Link href={"/"}>MENTALK</Link>
            </div>
            <div className={styles.menuContainer}>
              <Link href={"/with/us"}>멘토 찾기</Link>
            </div>
          </div>

          <div className={styles.rightMenu}>
            <div className={styles.searchContainer}>
              <input type="text" placeholder="검색어를 입력하세요" />
              <div className={styles.iconFrame}>
                <svg
                  clipRule="evenodd"
                  fillRule="evenodd"
                  strokeMiterlimit="2"
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m15.97 17.031c-1.479 1.238-3.384 1.985-5.461 1.985-4.697 0-8.509-3.812-8.509-8.508s3.812-8.508 8.509-8.508c4.695 0 8.508 3.812 8.508 8.508 0 2.078-.747 3.984-1.985 5.461l4.749 4.75c.146.146.219.338.219.531 0 .587-.537.75-.75.75-.192 0-.384-.073-.531-.22zm-5.461-13.53c-3.868 0-7.007 3.14-7.007 7.007s3.139 7.007 7.007 7.007c3.866 0 7.007-3.14 7.007-7.007s-3.141-7.007-7.007-7.007z"
                    fillRule="nonzero"
                  />
                </svg>
              </div>
            </div>
            {user ? (
              <div className={styles.profileContainer}>
                <Link href={"/my"} className={styles.nicknameFrame}>
                  {/* 닉네임어디까지올라가는거예요오오오오옹 */}
                  {user?.nickname}
                </Link>
                <div className={styles.profileFrame}></div>
              </div>
            ) : (
              <div className={styles.authContainer}>
                <Link href="/login">로그인</Link>
                <span>|</span>
                <Link href="/signup">회원가입</Link>
              </div>
            )}
          </div>
        </section>
      </nav>
    );
}

export default Nav;