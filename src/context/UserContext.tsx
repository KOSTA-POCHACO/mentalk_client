"use client"

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import DBMenteeTrans from "@/utils/DBMenteeTrans";
import DBMentorTrans from "@/utils/DBMentorTrans";
import Cookies from "js-cookie";
import axios from "axios";

type UserContextType = {
  user: Mentor | Mentee | null; // user는 Mentor, Mentee, 또는 null일 수 있음
  setUser: (user: any, userType: string) => void;
  userType: string;
  setUserType: (userType: string) => void;
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
  checkAccessToken : () => void;
  refreshAccessToken: () => void;
  logOut: () => void;
};

// Context 생성
export const UserContext = createContext<UserContextType | null>(null);

// Context Provider 컴포넌트
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Mentor | Mentee | null>(null);
  const [userType, setUserType] = useState<string>(Cookies.get('userType') || "mentor");
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleSetUser = (
    user: DBMentor | DBMentee,
    userType: string
  ) => {
    userType === "mentor"
      ? setUser(DBMentorTrans(user as DBMentor))
      : setUser(DBMenteeTrans(user as DBMentee));
  };

  const handleSetUserType = (userType: string) => {
    setUserType(userType);
    Cookies.set('userType', userType, { expires: 1 });  // userType을 쿠키에 저장 (1일 동안 유효)
  };


  const checkAccessToken = async () => {
    try {
      await axios({
        url: `${API_URL}/login/${userType}/accesstoken`,
        method: "GET",
        withCredentials: true,
      }).then((result) => {
        // console.log("login/userType/accessToken");
        // console.log(result.data.data);
        setIsLogin(true);
        handleSetUser(result.data.data, userType);
      });
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
        url: `${API_URL}/login/${userType}/refreshtoken`,
        method: "GET",
        withCredentials: true,
      });
    } catch (error) {
      console.log("리프레시 토큰으로 엑세스 토큰 발급 실패:", error);

      logOut();
    }
  };

  const logOut = async () => {
    try {
      await axios({
        url: `${API_URL}/logout/${userType}`,
        method: "POST",
        withCredentials: true,
      }).then(() => {
        setIsLogin(false);
        setUser(null);
        setUserType("mentor")
        Cookies.remove('userType');
      });
    } catch (error) {
      console.log("로그아웃 실패 : ", error);
    }
  }

    return (
        <UserContext.Provider value={{
        user,
        setUser: handleSetUser,
        userType,
        setUserType: handleSetUserType,
        isLogin,
        setIsLogin,
        checkAccessToken,
        refreshAccessToken,
        logOut,
      }}>
            {children}
        </UserContext.Provider>
    );
};

// useUserContext 훅
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(
      "useUserContext must be used within a UserContext.Provider"
    );
  }
  return context;
};