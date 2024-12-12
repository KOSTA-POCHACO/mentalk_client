import { useState } from "react";
import styles from "./userType.module.scss";

const UserType: React.FC = () => {
    const [userType, setUserType] = useState("mentor");

    return (
      <div className={styles.userType}>
        <label className={userType === "mentor" ? styles.selected : ""}>
          <strong>멘토</strong>
          <input
            type="radio"
            name="userType"
            value="mentor"
            checked={userType === "mentor"}
            onChange={(e) => setUserType(e.target.value)}
          />
        </label>
        <label className={userType === "mentee" ? styles.selected : ""}>
          <strong>멘티</strong>
          <input
            type="radio"
            name="userType"
            value="mentee"
            checked={userType === "mentee"}
            onChange={(e) => setUserType(e.target.value)}
          />
        </label>
      </div>
    );
}

export default UserType;