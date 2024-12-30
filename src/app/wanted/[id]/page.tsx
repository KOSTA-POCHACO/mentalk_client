"use client";

import SelectDateTime from "@/components/SelectDateTime";
import styles from "./wanted.module.scss";
import { use, useEffect, useState } from "react";
import axios from "axios";
import DBMentorTrans from "@/utils/DBMentorTrans";
import Introduce from "@/app/my/introduce/page";
import DBIntroduceTrans from "@/utils/DBIntroduceTrans";

interface PageProps {
    params: Promise<{ id: string }>;
}

const Wanted: React.FC<PageProps> = ({ params }) => {
  const { id } = use(params);
  const [profile, setProfile] = useState<IntroduceProfile>();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const introduce = profile?.introduce;

  useEffect(() => {

    const getProfile = async () => {
      try {
        const res = await axios.get(`${API_URL}/introduce/${id}`);
        const data = res.data;

        setProfile({
          mentor: DBMentorTrans(data),
          introduce: DBIntroduceTrans(data),
        });
      } catch (error) {
        console.log(error);
      }
    };

    getProfile();
  }, [id])
  
  return (
    <div className={styles.form}>
      <div className={styles.topContainer}>
        <div className={styles.dateContainer}>
          <SelectDateTime index={1} />
          <SelectDateTime index={2} />
          <SelectDateTime index={3} />
        </div>
        <div className={styles.rightItems}>
          <div className={styles.tagContainer}>
            {introduce?.tag.map((tag, index) => (
              <div key={index} className={styles.tagFrame}>
                <input type="checkbox" id={index.toString()}/>
                <label htmlFor={index.toString()}>{tag}</label>
              </div>
            ))}
          </div>
          <div className={styles.timeContainer}>
            <div>
              <input type="radio" id="15" name="time" value="15분" />
              <label htmlFor="15">15분</label>
            </div>
            <div>
              <input type="radio" id="30" name="time" value="30분" />
              <label htmlFor="30">30분</label>
            </div>
            <div>
              <input type="radio" id="45" name="time" value="45분" />
              <label htmlFor="45">45분</label>
            </div>
            <div>
              <input type="radio" id="60" name="time" value="60분" />
              <label htmlFor="60">60분</label>
            </div>
            <div>
              <input type="radio" id="90" name="time" value="90분" />
              <label htmlFor="90">90분</label>
            </div>
          </div>
        </div>
      </div>
      <textarea className={styles.content} placeholder="추가 요청 사항 및 멘토에게 미리 전하고 싶은 메시지를 자유롭게 작성해 주세요. (300자 이내)" />
      <button>제안하기</button>
    </div>
  );
};

export default Wanted;
