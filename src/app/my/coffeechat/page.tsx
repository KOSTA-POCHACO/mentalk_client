"use client"

import { useEffect, useState } from "react";
import styles from "./coffeechat.module.scss"
import axios from "axios";
import Coffeechat from "@/components/Coffeechat";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/UserContext";

const CoffeeChatPage : React.FC =  () => {

    const {user} = useUserContext();

    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const [coffeechatList, setCoffeechatList] = useState<any[]>([]);
    const newCoffeechatList : any[] = [];

    
    useEffect(() => {
        
        axios.get(`${API_URL}/coffeechat/mentor/${user?.id}`).then(async (result) => {
            console.log("data");
            console.log(result.data.data);
            console.log(result.data.data._id);
            await result.data.data.map((coffeechat : any) => {
                const newCoffeechat = {
                    coffeechat_id : coffeechat._id,
                    mentor_id : coffeechat.mentor_id,
                    mentee_id : coffeechat.mentee_id,
                    introduce_id : coffeechat.introduce_id,
                    meeting_date : "today",
                    wanted : coffeechat.coffee_wanted,
                    status : coffeechat.coffee_status,
                }

                newCoffeechatList.push(newCoffeechat);
            })

            setCoffeechatList(newCoffeechatList);

            console.log("newCoffeechatList");
            console.log(newCoffeechatList);
        }).catch((error) => {
            console.log(error);
        })
    }, [])

    return (
        <>
        <main>
            <div className={styles.wrap}>
                <h1>CoffeeChat page</h1>
                <>

                {
                    coffeechatList.map((coffeechat) => {
                        return (
                        <>
                         
                            <div className={styles.coffeechatContainer}>
                                <Coffeechat coffeechat_id={coffeechat.coffeechat_id} mentor_id={coffeechat.mentor_id} mentee_id={coffeechat.mentee_id} introduce_id={coffeechat.introduce_id} meeting_date="today" wanted={coffeechat.wanted} status={coffeechat.status}/>
                            </div>

                        </>
                        )
                    })
                }
             
                </>
                
                

            </div>
        </main>
           
        </>
    )
}


export default CoffeeChatPage;