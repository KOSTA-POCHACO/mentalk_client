"use client"

import { useRouter } from "next/router";

const With : React.FC =  () => {

    const router = useRouter();
    const {id} = router.query;

    return (
        <>
            <h1>With page id:{id}</h1>
        </>
    )
}

export default With;
