"use client"

import styles from "./MypageNav.module.scss"
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Nav : React.FC = () => {

    const pathname = usePathname();

    // 쿠키로 멘토인지 멘티인지 확인하고 state에 넣기
    const [user, setUser] = useState<Mentor | Mentee | null>({
        type: "Mentee",
        id : "test",
        email : "",
        nickname : "",
        img : "",
        phone : "",
        company : "",
        category : "",
        position : "",
        career : "",
        isChecked : false,
        warningCount : 0,
        favoriteCount : 0,
        gender : "",
        joinDate : "",
        suspension : false,
    });

    useEffect(() => {
        // 쿠키에서 읽어온 user의 타입이 mentor인지 mentee인지 확인
        
    }, [])

    // 만약 유저가 멘토라면
    if(user?.type === "Mentor"){
        // 멘티 nav
        return (
            <nav className={`${styles.nav}`}>
                <Link href={"/my"} className={ pathname === "/my" ? styles.active : ""}>내 정보</Link>
                <Link href={"/my/favorite"} className={ pathname === "/my/favorite" ? styles.active : ""}>즐겨찾기</Link>
                <Link href={"/my/coffeechat"} className={ pathname === "/my/coffeechat" ? styles.active : ""}>커피챗</Link>
                <Link href={"/my/chatting"} className={ pathname === "/my/chatting" ? styles.active : ""}>채팅</Link>
                <Link href={"/my/review"} className={ pathname === "/my/review" ? styles.active : ""}>내 리뷰</Link>
            </nav>
        )
    }


    // 만약 유저가 멘티라면
    if(user?.type === "Mentee"){
        // 멘토 nav
        return (
            <nav className={`${styles.nav}`}>
                    <Link href={"/my"} className={ pathname === "/my" ? styles.active : ""}>내 정보</Link>
                    <Link href={"/my/intro"} className={ pathname === "/my/intro" ? styles.active : ""}>내 포스팅</Link>
                    <Link href={"/my/coffeechat"} className={ pathname === "/my/coffeechat" ? styles.active : ""}>커피챗</Link>
                    <Link href={"/my/chatting"} className={ pathname === "/my/chatting" ? styles.active : ""}>채팅</Link>
                    <Link href={"/my/review"} className={ pathname === "/my/review" ? styles.active : ""}>받은 리뷰</Link>
            </nav>
        )

    }
 
 
}

export default Nav;