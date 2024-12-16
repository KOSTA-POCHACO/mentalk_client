import styles from "./SelectuserType.module.scss";
import { useUserContext } from "@/context/UserContext";

const SelectUserType: React.FC = () => {
  const { userType, setUserType } = useUserContext();

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

export default SelectUserType;