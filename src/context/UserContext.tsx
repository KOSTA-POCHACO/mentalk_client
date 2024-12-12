"use client"

import { createContext, ReactNode, useContext, useState } from "react";

type UserContextType = {
  user: Mentor | Mentee | null; // user는 Mentor, Mentee, 또는 null일 수 있음
  setUser: (user: Mentor | Mentee | null) => void; // user를 업데이트하는 함수
};

// Context 생성
export const UserContext = createContext<UserContextType | undefined>(undefined);

// Context Provider 컴포넌트
export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<Mentor | Mentee | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(
      "useUserContext must be used within a UserContext.Provider"
    );
  }
  return context;
};