import type React from "react";
import './Input.css'


export type InputVariant =
| "large"
| "small";

interface inputProps {
    placeholder: string;
    variant: InputVariant;
    onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
    name: string;
    value: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    type?: string;
    label: string;
    required?: boolean;

}

function Input({ placeholder, variant, onClick, onChange, value, name, type = "text", required, label }: inputProps) {
    return (
        <label className="input-label">
            {label}
            <input type={type} placeholder={placeholder} onClick={onClick} name={name} value={value} onChange={onChange} required={required} className={`input input--${variant}`.trim()} ></input>
        </label>
    );
}

export default Input