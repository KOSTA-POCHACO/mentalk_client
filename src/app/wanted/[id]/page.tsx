"use client";

import SelectDateTime from "@/components/SelectDateTime";
import styles from "./wanted.module.scss";
import { use } from "react";

interface PageProps {
    params: Promise<{ id: string }>;
}

const Wanted: React.FC<PageProps> = ({ params }) => {
    const { id } = use(params);

  return (
    <main>
      <form>
        <div className={styles.wantedContainer}>
            <div className={styles.dateContainer}>
                <SelectDateTime index={1} />
                <SelectDateTime index={2} />
                <SelectDateTime index={3} />
            </div>
            <div className={styles.rightItems}>
                <div className={styles.timeContainer}>
                    <div>
                        <input type="radio" id="1" name="time" value="15분" />
                        <label htmlFor="1">15분</label>
                    </div>
                    <div>
                        <input type="radio" id="2" name="time" value="30분" />
                        <label htmlFor="2">30분</label>
                    </div>
                    <div>
                        <input type="radio" id="3" name="time" value="45분" />
                        <label htmlFor="3">45분</label>
                    </div>
                    <div>
                        <input type="radio" id="4" name="time" value="60분" />
                        <label htmlFor="4">60분</label>
                    </div>
                </div>
                <div className={styles.tagContainer}>
                    <label>
                        안녕 나는 태그야
                        <input type="checkbox" />
                    </label>
                    <label>
                        새별님
                        <input type="checkbox" />
                    </label>
                    <label>
                        보고싶어여
                        <input type="checkbox" />
                    </label>
                    <label>
                        빨리 와요
                        <input type="checkbox" />
                    </label>
                </div>
            </div>
        </div>
      </form>
    </main>
  );
};

export default Wanted;
