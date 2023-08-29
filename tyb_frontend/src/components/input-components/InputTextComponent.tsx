import React from 'react';
import {handleFormFieldChange} from "../../utils/commonFunctions";
import "./InputTextComponent.scss"

interface InputTextComponentProps {
    id?:string,
    name:string,
    label:string,
    type:string,
    value:string,
    setState:any,
    required?:boolean,
    disabled?:boolean,
    error?:boolean
}


const InputTextComponent= ({id,name, label, type, disabled, value, setState, required, error}:InputTextComponentProps) => {
    const handleChange = (e: any) => {
        //if (typeof onChange === "undefined") {
        //    return;
        //}
        let newValue: any;
        newValue = e.currentTarget.value;
        handleFormFieldChange(setState, name, newValue);
    };


    return (
        <div className="InputTextComponent mb-2">
            {label && (
                <label
                    htmlFor={id? id : name}
                    className={"InputTextComponent__label " + (required ?  "required" : "")}>
                    {label}
                </label>
            )}
            <input
                id={id? id : name}
                value={value}
                type={type}
                disabled={disabled}
                onChange={(e) => handleChange(e)}
                className={error ? "error" : "border border-primary"}
            />
            {
           //    error && (
           //    <div className="Validation__errorMessage">
           //        {MESSAGE_VALIDATION_FIELD[error.type.toUpperCase()]}
           //    </div>
           //)
            }
        </div>
    );
}

export default InputTextComponent;