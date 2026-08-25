import React from "react";
import 'Input.css'


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
}

function input({ placeholder, variant, onClick, onChange, value, name, type = "text" }: inputProps) {
    return (
        <input type={type} placeholder={placeholder} onClick={onClick} name={name} value={value} onChange={onChange}></input>
    );
}

export default input