import React, {FC, useContext, useEffect, useMemo, useState} from 'react';
import './SearchableSelect.scss';
import {FormikProps} from "formik";
import {AppContext} from "../../../AppContext";

export interface SelectOptionType {
    label: string,
    value: string | number
}

type SearchableSelectProps = {
    disabled?: boolean
    name: string,
    label: string,
    placeholder?: string,
    data: SelectOptionType[],
    isRequired?: boolean;
    lengthDropDown?: "small-dropDown" | "medium-dropDown"
} & (
    | {
    //se abbiamo l'oggetto formik i campi sotto non serve passarli
    formik: FormikProps<any>
    valueToReset?: never;
    error?: never;
    onSelectOption?: never,

}
    | {
    formik?: never
    valueToReset: string;
    error?: any;
    onSelectOption: any,

}
    )

/**
 * @description A custom searchable select component without the <select> HTML tag
 * @param name Name of the component (like an ID)
 * @param label Active label of the value being displayed
 * @param data Array with available options
 * @param value Value state for reset field when reset form
 * @param placeholder Placeholder to display
 * @param disabled Boolean, true if the component should be disabled
 * @param onSelectOption Callback for the select event
 * @param isRequired Boolean, true if the field is required
 * @param lengthDropDown Max height of the options window
 * @returns The SelectComponent JSX element
 *
 */
const SearchableSelect: FC<SearchableSelectProps> = ({
                                                         disabled,
                                                         name,
                                                         label,
                                                         placeholder,
                                                         data,
                                                         valueToReset = "",
                                                         onSelectOption,
                                                         isRequired,
                                                         error,
                                                         lengthDropDown,
                                                         formik
                                                     }: SearchableSelectProps) => {

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


    const [state, setState] = useState({
        selectOption: {
            isSelected: false,
            selectedClass: "unSelected",
            lengthDropDown: "medium-dropDown"
        },
        selectedLabel: "",
    })

    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const [maxHighlightedIndex, setMaxHighlightedIndex] = useState(data.length)


    const handleOnChangeFormik = (name: string, value: string | number, upperCase: boolean = true) => {
        formik?.setFormikState((oldState: any) => {
            const newState = {...oldState};
            if (typeof value !== "number") {
                newState.values[name] = typeof value !== "number" ? value.toUpperCase() : value;
            }
            return newState;
        });
        formik?.setFieldError(name, "")
    };

    /**
     * @description Callback to updates the selected label when reset all form fields
     */
    useEffect(() => {
        let value = valueToReset
        if (formik) {
            value = formik.values[name]
        }
        if (value === "" && state.selectedLabel !== "") {
            setState((oldState) => ({...oldState, selectedLabel: ""}));
        }
    }, [formik, valueToReset]);

    /**
     * @description Calls the prop onSelectOption callback and updates the selected label
     * @param option the new option
     */
    const selectOption = (option: SelectOptionType) => {
        formik ? handleOnChangeFormik(name, option.value) : onSelectOption(name, option.value);
        setState((oldState) => ({
            ...oldState, selectedLabel: option.label,
        }));
    };


    /**
     * @description Filter the option that contains the inputted letters from the input field
     * and scroll it into view
     * @param event HTML event
     * @returns void
     */
    const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        if (value === "") {
            formik ? handleOnChangeFormik(name, "") : onSelectOption(name, "");
        }
        setState((oldState: any) => {
            const newState = {...oldState}
            if (!newState.selectOption.isSelected) {
                openDropDown()
            }
            newState.selectedLabel = value
            return newState
        })
    }

    const classNameSelect = {
        "SearchableSelect__label": ["SearchableSelect__label"],
    }

    /**
     * @description Show the option of select component
     * @return void
     */
    const openDropDown = () => {
        setState((oldState: any) => ({
            ...oldState, selectOption: {
                isSelected: true, selectedClass: "selected",
            },
        }));
    }

    /**
     * @description Hide the option of select component
     * @return void
     */
    const closeDropDown = () => {
        setState((oldState: any) => ({
            ...oldState, selectOption: {
                isSelected: false, selectedClass: "unSelected",
            },
        }));
    }

    if (isRequired) {
        classNameSelect["SearchableSelect__label"].push("required")
    }

    const dataFilter = useMemo(() => {
        let dataToReturn = data.filter((item) => (item.label.toLowerCase().includes(state.selectedLabel.toLowerCase())))
        setMaxHighlightedIndex(dataToReturn.length - 1)
        return dataToReturn
    }, [state.selectedLabel, data])

    const keyboardControl = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (highlightedIndex < 0 || highlightedIndex > maxHighlightedIndex) {
            setHighlightedIndex(0)
        }
        if (event.key === "ArrowUp") {
            if (highlightedIndex > 0) {
                setHighlightedIndex(highlightedIndex - 1)
            }
        } else if (event.key === "ArrowDown") {
            if (highlightedIndex < maxHighlightedIndex) setHighlightedIndex(highlightedIndex + 1)
        } else if (event.key === "Enter") {
            if (dataFilter[highlightedIndex]) {
                selectOption(dataFilter[highlightedIndex])
                closeDropDown()
            }
        }
    }

    return (<div className="SearchableSelect">
        <label htmlFor={name} className={classNameSelect["SearchableSelect__label"].join(" ")}>{label}</label>
        <div
            className={`SearchableSelect__container ${state.selectOption.selectedClass} ${disabled ? "disabled" : ""} ` + (fieldError ? " error" : "")}
            onClick={!disabled ? (state.selectOption.isSelected ? closeDropDown : openDropDown) : () => {
            }}>
            <input
                className={"SearchableSelect__select "}
                placeholder={placeholder ? placeholder : "Scegliere un'opzione"}
                id={name}
                value={state.selectedLabel}
                disabled={disabled}
                onChange={handleFilter}
                onBlur={closeDropDown}
                autoComplete={"off"}
                onKeyDown={keyboardControl}
            />
            <i className={`bi bi-chevron-down SearchableSelect__image`}/>
        </div>

        {!state.selectOption.isSelected ? <div className="Validation__errorMessage small p-0">{fieldError ? fieldError : ""}</div>:null}

        <ul className={state.selectOption.isSelected ? `SearchableSelect__ul  ${lengthDropDown}` : "d-none"}
            role="list">
            {dataFilter
                .map((option, idx) => (<li
                    className={`SelectComponent__select__optionsUl-li 
                        ${idx === highlightedIndex ? "SelectComponent__select-highlighted" : ""} 
                        ${idx === highlightedIndex ? "SelectComponent__select-selected" : ""} `}
                    key={`${name}-${option.value}-${idx}`}
                    role="option"
                    onMouseDown={e => { // mouseDown instead of click because mouseDown is before input
                        e.stopPropagation();
                        selectOption(option)
                    }}
                    onMouseEnter={() => setHighlightedIndex(idx)}
                >
                    {option.label}
                </li>))}
        </ul>


    </div>);
}

export default SearchableSelect;