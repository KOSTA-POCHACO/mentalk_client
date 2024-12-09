"use client"

import styles from "./MypageNav.module.scss"
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Nav : React.FC = () => {

    const pathname = usePathname();
    console.log(pathname);

    const [user, setUser] = useState<Mentor | Mentee | null>();

    useEffect(() => {
        // 쿠키에서 읽어온 user의 타입이 mentor인지 mentee인지 확인
        
    }, [])

    return (
        <nav className={`${styles.nav}`}>
                <Link href={"/my"} className={ pathname === "/my" ? styles.active : ""}>내 정보</Link>
                <Link href={"/my/posting"} className={ pathname === "/my/posting" ? styles.active : ""}>내 포스팅</Link>
                <Link href={"/my/review"} className={ pathname === "/my/review" ? styles.active : ""}>받은 리뷰</Link>
                <Link href={"/my/chatting"} className={ pathname === "/my/chatting" ? styles.active : ""}>채팅</Link>
                <Link href={"/my/coffeechat"} className={ pathname === "/my/coffeechat" ? styles.active : ""}>커피챗</Link>
        </nav>
    )
}

export default Nav;