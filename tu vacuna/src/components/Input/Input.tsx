import React from "react";
import 'Input.css'


export type InputVariant =
| "large"
| "small";

interface inputProps{
    placeholder: string;
    variant: InputVariant
}

function input({placeholder, variant}: inputProps){
    return(
        <input></input>

    )
}

export default input