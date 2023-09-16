import {useEffect, useState} from "react";
import "./InputTextComponent.scss";
import {FormikProps} from 'formik';

type InputTextComponentPropsType = {
    name: string;
    label?: string;
    placeholder?: string;
    type?: string;
    acceptFile?: string;
    disabled?: boolean;
    register?: (name: string, value: object) => any,
    maxLength?: number;
    isRequired?: boolean;

} & (
    | {
    //se abbiamo l'oggetto formik i campi sotto non serve passarli
    formik: FormikProps<any>
    value?: never;
    error?: never;
    onChange?: never;

}
    | {
    formik?: never
    value: string;
    error?: any;
    onChange?: (name: string, value: string) => void;


}
    )

enum TInputType {
    file = "file",
    text = "text"
}

/**
 * InputTextComponent
 * @param {string} name the name of the input
 * @param {string} label the label of the input
 * @param {string} value the value of the input
 * @param {string} placeholder the placeholder of the input
 * @param {string} type the type of the input
 * @param {string} acceptFile the files accepted by the input
 * @param {boolean} disabled the disabled state of the input
 * @param {function} onChange the onChange callback function to call when the input value changes (name, value) => void
 * @param {function} register function of the "react-hook-form" library, for field validation
 * @param {any} error contains the display error for single input
 * @param {string} type contains the type input
 * @param {boolean} isRequired boolean, true if the field is required
 * @returns {JSX.Element}
 */
const InputTextComponent = ({
                                name, label, value, placeholder, type = "text", acceptFile = "*", disabled = false,
                                onChange, maxLength, error, isRequired, formik
                            }: InputTextComponentPropsType): JSX.Element => {

    //Gestione errori formik
    const [fieldError, setFieldError] = useState(error)
    const getFieldError = (form: FormikProps<any>, fieldName: string): string => {
        return (form.errors as any)[fieldName] || "";
    };

    useEffect(() => {
        if (formik) {
            setFieldError(getFieldError(formik, name))
        }
    }, [formik?.errors]);


    const handleOnChangeFormik = (name: string, value: string, upperCase: boolean = true) => {
        formik?.setFormikState((oldState: any) => {
            const newState = {...oldState};
            newState.values[name] = upperCase ? value.toUpperCase() : value;
            return newState;
        });
        formik?.setFieldError(name, "")
    };

    const handleChange = (e: any) => {
        if (typeof onChange === "undefined" && !formik) {
            return;
        }

        let newValue: any;
        if (type === TInputType.file) {
            if (e.target.files) {
                newValue = e.target.files[0];
            }
        } else {
            newValue = e.currentTarget.value;
            if (type === "number" && maxLength) {
                newValue = newValue.substr(0, maxLength);
            }
        }
        if (formik) {
            handleOnChangeFormik(name, newValue)
        } else if (onChange) {
            onChange(name, newValue);
        }
    };

    const classNames = {
        "InputTextComponent__label": ["InputTextComponent__label"]
    };
    if (isRequired) {
        classNames["InputTextComponent__label"].push("required");
    }

    return (
        <div className="InputTextComponent">
            {label &&
                <label htmlFor={label} className={classNames["InputTextComponent__label"].join(" ")}>{label}</label>}
            <input
                id={label}
                value={formik ? formik.values[name] : value}
                placeholder={placeholder}
                type={type}
                accept={acceptFile}
                disabled={disabled}
                onChange={(e) => handleChange(e)}
                maxLength={maxLength}
                className={fieldError ? "error" : ""}
            />

            <div className="Validation__errorMessage small p-0">{fieldError ? fieldError : ""}</div>
        </div>
    );
};

export default InputTextComponent;