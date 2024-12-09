"use client"

import { useEffect, useState } from "react";

const My : React.FC =  () => {

    const [user, setUser] = useState<Mentor | Mentee | null>();

    useEffect(() => {
        // 쿠키에서 읽어온 user의 타입이 mentor인지 mentee인지 확인
        
    }, [])

    return (
        <main>
                Mypage
        </main>
    )
}


export default My;