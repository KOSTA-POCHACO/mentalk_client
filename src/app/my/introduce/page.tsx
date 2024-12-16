"use client"

import { useUserContext } from "@/context/UserContext";
import styles from "./introduce.module.scss"
import useIntroduceData from "@/hook/useIntroduce";
import { useEffect, useState } from "react";

const Introduce : React.FC = () => {

    const { user } = useUserContext();
    const [introduce, setIntroduce] = useState<Introduce | null>(null);
    const introduceData = useIntroduceData();

    useEffect(() => {
        setIntroduce(introduceData);
        console.log(user);
    }, []);

    return (
        <main>
            <div className={styles.wrap}>
                <div className={styles.titleContainer}>
                    <div className={styles.title}>{introduce?.title}</div>
                </div>

                <div className={styles.infoContainer}>
                    <p>{user?.nickname}</p>
                    <p>{introduce?.coffeechatCount}회</p>
                    <p>{"⭐️ ".repeat(introduce ? introduce?.rating : 0)}</p>
                </div>
                
                <div className={styles.content}>
                    <div>{introduce?.content}</div>

                </div>
            </div>
          
        </main>
    )
}

export default Introduce;