import CustomButton from "./CustomButton";
import styles from "./modal.module.scss"

interface ModalProps {
    title: string;
    content : string;
    onConfirmClick : () => void;
    onCancelClick : () => void;
}


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