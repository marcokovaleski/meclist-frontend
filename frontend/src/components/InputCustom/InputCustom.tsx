import './InputCustom.css'

type InputProps = {
    label?: string;
    placeholder?: string;
    value: string | number;
    type: 'text' | 'number' | 'email' | 'password';
    name: string;
    required?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputCustom = ({ label, placeholder, type: inputType, onChange, name, value , required}: InputProps) => (
    <div className="input-container">
        {label && <label htmlFor={name}>{label}</label>}
        <input
            type={inputType}
            placeholder={placeholder}
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            required={required}
        />
    </div>
);

export default InputCustom;
