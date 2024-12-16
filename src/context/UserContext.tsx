"use client"

import { createContext, ReactNode, useContext, useState } from "react";
import DBMenteeTrans from "@/utils/DBMenteeTrans";
import DBMentorTrans from "@/utils/DBMentorTrans";
import Cookies from "js-cookie";

type UserContextType = {
  user: Mentor | Mentee | null; // user는 Mentor, Mentee, 또는 null일 수 있음
  setUser: (user: any, userType: string) => void;
  userType: string;
  setUserType: (userType: string) => void;
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
};

// Context 생성
export const UserContext = createContext<UserContextType | null>(null);

// Context Provider 컴포넌트
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Mentor | Mentee | null>(null);
  const [userType, setUserType] = useState<string>(Cookies.get('userType') || "mentor");
  const [isLogin, setIsLogin] = useState<boolean>(false);

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

    return (
        <UserContext.Provider value={{
        user,
        setUser: handleSetUser,
        userType,
        setUserType: handleSetUserType,
        isLogin,
        setIsLogin
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