"use client"

import styles from "./MypageNav.module.scss"
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useUserContext } from "@/context/UserContext";

const Nav : React.FC = () => {

    const pathname = usePathname();

    const { user } = useUserContext();

    // 만약 유저가 멘토라면
    if(user?.type === "Mentor"){
        // 멘티 nav
        return (
            <nav className={`${styles.nav}`}>
                        <Link href={"/my"} className={ pathname === "/my" || pathname === "/my/edit" ? styles.active : ""}>내 정보</Link>
                        <Link href={"/my/introduce"} className={ pathname === "/my/introduce" ? styles.active : ""}>내 포스팅</Link>
                        <Link href={"/my/coffeechat"} className={ pathname === "/my/coffeechat" ? styles.active : ""}>커피챗</Link>
                        {/* <Link href={"/my/chatting"} className={ pathname === "/my/chatting" ? styles.active : ""}>채팅</Link> */}
                        <Link href={"/my/review"} className={ pathname === "/my/review" ? styles.active : ""}>받은 리뷰</Link>
            </nav>
        )
    }
    
    // 만약 유저가 멘티라면
    if(user?.type === "Mentee"){
        // 멘토 nav
        return (
            <nav className={`${styles.nav}`}>
                <Link href={"/my"} className={ pathname === "/my" || pathname === "/my/edit" ? styles.active : ""}>내 정보</Link>
                <Link href={"/my/favorite"} className={ pathname === "/my/favorite" ? styles.active : ""}>즐겨찾기</Link>
                <Link href={"/my/coffeechat"} className={ pathname === "/my/coffeechat" ? styles.active : ""}>커피챗</Link>
                <Link href={"/my/chatting"} className={ pathname === "/my/chatting" ? styles.active : ""}>채팅</Link>
                <Link href={"/my/review"} className={ pathname === "/my/review" ? styles.active : ""}>내 리뷰</Link>

            </nav>
        )

    }
 
 
}

export default Nav;