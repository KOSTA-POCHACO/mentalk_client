"use client"

import styles from "./introduce.module.scss"
import useIntroduceData from "@/hook/useIntroduceData";
import useUserData from "@/hook/useUserData";
import { useEffect, useState } from "react";

const Intro : React.FC = () => {

    const [user, setUser] = useState<Mentor | Mentee | null>(null);
    const userData = useUserData();
    const [introduce, setIntroduce] = useState<Introduce | null>(null);
    const introduceData = useIntroduceData();

    useEffect(() => {
        setUser(userData);
        setIntroduce(introduceData);
    }, [userData, introduceData]);

    return (
        <main>
            <div className={styles.wrap}>
                <div className={styles.titleContainer}>
                    <div className={styles.title}>{introduce?.title}</div>
                </div>

                <div className={styles.infoContainer}>
                    <p>{user?.nickname}</p>
                    <p>{introduce?.coffeechatCount}회</p>
                    <p>⭐️{introduce?.rating}</p>
                </div>
                
                <div className={styles.content}>
                    <div>{introduce?.content}</div>

                </div>
            </div>
          
        </main>
    )
}

export default Intro;