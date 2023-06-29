import React from 'react';
import {handleFormFieldChange} from "../../utils/commonFunctions";


interface InputTextComponentProps {
    name:string,
    label:string,
    type:string,
    value:string,
    setState:any,
    disabled?:boolean
}


const InputTextComponent= ({name, label, type, disabled, value, setState}:InputTextComponentProps) => {
    const handleChange = (e: any) => {
debugger
        //if (typeof onChange === "undefined") {
        //    return;
        //}
        let newValue: any;
        newValue = e.currentTarget.value;
        handleFormFieldChange(setState, name, newValue);
    };


    return <div className="form-outline mb-4">
            <label className="form-label  InputTextComponent_required" htmlFor="loginPassword">{label}</label>
            <input onChange={(e) => handleChange(e)}
                   value={value}
                   type={type}
                   name={name}
                   className="form-control"
                   disabled={disabled}/>
        </div>
}

export default InputTextComponent;