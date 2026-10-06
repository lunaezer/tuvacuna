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
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    type?: string;
    label: string;
    required?: boolean;
    // string: marca el campo y muestra el mensaje. true: solo marca el campo.
    error?: string | boolean;
}

function Input({ placeholder, variant, onClick, onChange, value, name, type = "text", required, label, error }: inputProps) {
    return (
        <label className="input-label">
            {label}
            <input
                type={type}
                placeholder={placeholder}
                onClick={onClick}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className={`input input--${variant} ${error ? "input--error" : ""}`.trim()}
                aria-invalid={!!error}
            />
            {typeof error === "string" && error && (
                <span className="input-error">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 7v5l3 2" />
                    </svg>
                    {error}
                </span>
            )}
        </label>
    );
}

export default Input