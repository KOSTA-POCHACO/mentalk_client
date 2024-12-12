import styles from "./customButton.module.scss"

interface customButtonProps {
    content : string;
    backgroundColor? : string,
    color?:string,
    onClick : () => void;
}

const CustomButton : React.FC<customButtonProps> = ({content, backgroundColor, color, onClick}) => {

    return (
        <button onClick={onClick} className={styles.button} style={{backgroundColor : backgroundColor, color:color}}>
            {content}
        </button>
    )
}

export default CustomButton;