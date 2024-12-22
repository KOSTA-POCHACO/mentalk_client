import styles from "./customButton.module.scss"

interface customButtonProps {
    content : string;
    backgroundColor? : string,
    color?:string,
    onClick : () => void;
}

/**
 * 
 * 인라인 스타일 강제 적용!
 * 기존 적용된 CSS 파일을 무시하고 먼저 적용됩니다.
 * 
 * @content 버튼 문구 
 * @backgroundColor 배경 색
 * @color 글자 색
 * @onClick 클릭 시 실행될 함수
 * 
 * 
 */
const CustomButton : React.FC<customButtonProps> = ({content, backgroundColor, color, onClick}) => {

    return (
        <button onClick={onClick} className={styles.button} style={{backgroundColor : backgroundColor, color:color}}>
            {content}
        </button>
    )
}

export default CustomButton;