"use client"

import IntroduceCard from "@/components/IntroduceCard";
import styles from "./us.module.scss"
import { useEffect, useState } from "react";
import axios from "axios";
import DBMentorTrans from "@/utils/DBMentorTrans";
import DBIntroduceTrans from "@/utils/DBIntroduceTrans";
import { useRouter } from "next/navigation";


const WithUs: React.FC = () => {

    const [profileList, setProfileList] = useState<IntroduceProfile[]>([]);
    const router = useRouter();

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const handleClick = (mentorId: string) => {
        router.push(`/with/${mentorId}`)
    }

    useEffect(() => {
        const fetchIntroduce = async () => {
            try {
                const res = await axios.get(`${API_URL}/introduce`);
                const data = res.data;

                const profiles = data.map((item: any) => ({
                    mentor: DBMentorTrans(item.mentor),
                    introduce: DBIntroduceTrans(item),
                }));

                setProfileList(profiles);

            } catch (error) {
                console.log(error);
            }
        }
        fetchIntroduce();
    }, [])

    return (
      <main className={styles.main}>
        <div className={styles.wrap}>
            {profileList.map((profile, index) => (
              <div
                className={styles.profileContainer}
                key={index}
                onClick={() => handleClick(profile.mentor.id)}
              >
                <IntroduceCard
                  mentor={profile.mentor}
                  introduce={profile.introduce}
                />
              </div>
            ))}
        </div>
      </main>
    );
}

export default WithUs;