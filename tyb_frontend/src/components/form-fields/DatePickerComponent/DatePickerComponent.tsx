import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePickerComponent.scss";
import {useEffect, useState} from "react";
import {FormikProps} from "formik";


type DatePickerComponentPropsType = {
    name: string,
    label: string,
    dateFormat: string,
    disabled?: boolean,
    isRequired?: boolean
} & (
    | {
    //se abbiamo l'oggetto formik i campi sotto non serve passarli
    formik: FormikProps<any>
    selected?: never,
    error?: never;
    onChange?: never;
}
    | {
    formik?: never
    selected: Date | null | undefined,
    error?: any;
    onChange?: (name: string, value: string | Date) => void;
}
    );

/**
 * @description A date picker component based on the react-datepicker library
 * @param {string} name the name of the input
 * @param {string} label the label of the input
 * @param {string} dateFormat the date format to use
 * @param {Date} selected the selected date
 * @param {boolean} disabled a boolean, true if the component is disabled
 * @param {function} onChange the onChange callback functiion (name, value) => void
 * @param {boolean} isRequired boolean, true if the field is required
 * @param formik
 * @returns {JSX.Element} The component JSX Element
 */
const DatePickerComponent = ({
                                 name,
                                 label,
                                 dateFormat,
                                 selected,
                                 disabled = false,
                                 onChange,
                                 isRequired,
                                 formik
                             }: DatePickerComponentPropsType) => {


    //Gestione errori formik
    const [fieldError, setFieldError] = useState("")
    const getFieldError = (form: FormikProps<any>, fieldName: string): string => {
        return (form.errors as any)[fieldName] || "";
    };

    useEffect(() => {
        if (formik) {
            setFieldError(getFieldError(formik, name))
        }
    }, [formik?.errors]);


    const handleOnChange = (name: string, value: string | Date) => {
        if (formik) {
            formik?.setFormikState((oldState: any) => {
                const newState = {...oldState};
                newState.values[name] = value instanceof Date ? new Date(value) : value;
                return newState;
            });

            formik?.setFieldError(name, "")
        } else {
            if (onChange) {
                onChange(name, value)
            }
        }
    };

    const classNames = {
        "DatePickerComponent__label": ["DatePickerComponent__label"]
    };
    if (isRequired) {
        classNames["DatePickerComponent__label"].push("required");
    }

    return (<div className="DatePickerComponent">
        <label className={classNames["DatePickerComponent__label"].join(" ")} htmlFor={name}>
            {label}
        </label>
        <label
            className="DatePickerComponent__labelIconWrapper"
            onClick={e => e.preventDefault()} // Close calendar on selection
        >
            <DatePicker
                dateFormat={dateFormat}
                selected={formik ? formik.values[name] : selected}
                id={name}
                onChange={(date: Date) => {
                    // Note: this calculation fixates the date, not the time
                    if (date !== null) {
                        const diffAbs = Math.abs(date.getTimezoneOffset());
                        const newValue = date !== null ? new Date(date.getTime() + diffAbs * 60000) : date;
                        newValue.setHours(diffAbs / 60);
                        handleOnChange(name, newValue);
                    } else {
                        const newValue = date;
                        handleOnChange(name, newValue);
                    }

                }}
                disabled={disabled}
                shouldCloseOnSelect={true}
                className={fieldError ? " error " : ""}
            />
            <i className="bi bi-calendar4"></i>
        </label>
        <div className="Validation__errorMessage small p-0">{fieldError ? fieldError : ""}</div>

    </div>);
};

export default DatePickerComponent;