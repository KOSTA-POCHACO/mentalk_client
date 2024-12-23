import { useState } from "react";
import styles from "./selectDateTime.module.scss"
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale/ko";
import { FaCalendarCheck } from "react-icons/fa6";

interface dateProps {
    index: number;
}

const SelectDateTime: React.FC<dateProps> = ({ index }) => {
    const [dateTime, setDateTime] = useState<Date | null>(null);
    const [isSelected, setIsSelected] = useState(false);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    registerLocale("ko", ko);

    const handelDateChange = (date: Date | null) => {
        setDateTime(date);
        setIsSelected(!!date);
    };

    return (
      <div
        className={`${styles.dateContainer} ${
          isSelected ? styles.selected : ""
        }`}
      >
        <div className={styles.dateText}>
          {isSelected ? (
            <FaCalendarCheck />
          ) : (
            <svg
              viewBox="0 0 28 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.8 27.619C2.03 27.619 1.37083 27.3486 0.8225 26.8077C0.274167 26.2669 0 25.6167 0 24.8571V5.52381C0 4.76429 0.274167 4.11409 0.8225 3.57321C1.37083 3.03234 2.03 2.7619 2.8 2.7619H4.2V0H7V2.7619H18.2V0H21V2.7619H22.4C23.17 2.7619 23.8292 3.03234 24.3775 3.57321C24.9258 4.11409 25.2 4.76429 25.2 5.52381V13.3607C24.7567 13.1536 24.3017 12.981 23.835 12.8429C23.3683 12.7048 22.89 12.6012 22.4 12.5321V11.0476H2.8V24.8571H11.62C11.7833 25.3635 11.9758 25.8468 12.1975 26.3071C12.4192 26.7675 12.6817 27.2048 12.985 27.619H2.8ZM21 29C19.0633 29 17.4125 28.3268 16.0475 26.9804C14.6825 25.6339 14 24.0056 14 22.0952C14 20.1849 14.6825 18.5565 16.0475 17.2101C17.4125 15.8637 19.0633 15.1905 21 15.1905C22.9367 15.1905 24.5875 15.8637 25.9525 17.2101C27.3175 18.5565 28 20.1849 28 22.0952C28 24.0056 27.3175 25.6339 25.9525 26.9804C24.5875 28.3268 22.9367 29 21 29ZM23.345 25.375L24.325 24.4083L21.7 21.819V17.9524H20.3V22.3714L23.345 25.375Z"
                fill="#6B6B6B"
              />
            </svg>
          )}
          <p>희망일자 {index}</p>
        </div>
        <DatePicker
          className={`${styles.datepicker} ${
            isSelected ? styles.selectedText : ""
          }`}
          selected={dateTime}
          onChange={handelDateChange}
          shouldCloseOnSelect //날짜를 선택하고 나면 자동으로 달력 닫기
          showTimeSelect
          dateFormat="yyyy-MM-dd a hh시 mm분" // 년/월/일 시간 형식
          dateFormatCalendar="yyyy년 MM월"
          locale="ko"
          timeIntervals={30} // 30분 간격
          timeCaption="시간"
          minDate={tomorrow} // 다음 날 부터 선택 가능
          placeholderText="날짜 및 시간을 선택하세요"
          portalId="root-portal"
        />
        {/* <div>
                    {dateTime && <p>Selected: {dateTime.toLocaleString()}</p>}
                </div> */}
      </div>
    );
}

export default SelectDateTime;