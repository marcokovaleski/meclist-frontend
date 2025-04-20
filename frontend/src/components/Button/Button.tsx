import './button.css'

interface IButtonProps {
    text: string;
    secondary?: boolean;
    onClick?: () => void;
}

export default function Button({ text, secondary, onClick }: IButtonProps) {
    return (
        <button className={secondary ? "btn-secondary" : "btn-primary"} 
            onClick={onClick}>
            {text}
        </button>
    )
}