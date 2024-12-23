import CustomButton from "./CustomButton";
import styles from "./modal.module.scss"

interface ModalProps {
    title: string;
    content : string;
    onConfirmClick : () => void;
    onCancelClick : () => void;
}

/**
 * 
 * @title 모달 제목
 * @content 모달 내용
 * @onConfirmClick 확인 누르면 실행될 함수
 * @onCancelClick 취소 누르면 실행될 함수
 * 
 */
const Modal : React.FC<ModalProps> = ({title, content, onConfirmClick, onCancelClick}) => {

    return (
        <div className={styles.wrap}>
            <div className={styles.container}>

                    <div className={styles.title}>
                        {title}
                    </div>
                    <hr />
                    <div className={styles.content}>
                        {content}
                    </div>
                    <div className={styles.buttonContainer}>
                        <CustomButton content="확인" onClick={onConfirmClick}/>
                        <CustomButton content="취소" onClick={onCancelClick} backgroundColor="lightgray" color="black"/>
                    </div>
            </div>
        </div>
    )
}

export default Modal;