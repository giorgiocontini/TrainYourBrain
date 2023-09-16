// libs
import React, { useId, useRef } from "react";
import "./CheckboxComponent.scss";

type TCheckboxComponentProps = {
    name: string,
    label: string,
    checked: boolean,
    onChange?: (name: string, value?: boolean) => void,
    isDisabled?: boolean,
}

/**
    * CheckboxComponent
    * @param {string} name the name of the input
    * @param {string} label the label of the input
    * @param {boolean} checked the checked state of the input
    * @param {function} onChange the onChange callback function handle the change of the input
    * @param {boolean} isDisabled the disabled state of the input
    * @returns {JSX.Element}
 */
const CheckboxComponent = ({ name, label, checked, onChange, isDisabled }: TCheckboxComponentProps) => {
    const id = useId();
    const checkboxEl = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
        if (typeof onChange === "undefined") {
            return;
        }
        const name = e.currentTarget.name;
        const value = e.currentTarget.checked;
        onChange(name, value);
    };

    const handleClick = () => {
        if (typeof onChange === "undefined") {
            return;
        }
        const checkbox = checkboxEl.current;
        if (checkbox === null) {
            return;
        }
        const name = checkbox.name;
        const value = !checked;
        onChange(name, value);
    };

    return (
        <div className="CheckboxComponent">
            <input
                ref={checkboxEl}
                id={name + id}
                className="CheckboxComponent__input"
                name={name}
                onChange={handleChange}
                type="checkbox"
                checked={checked}
                disabled={isDisabled}
            />
            <svg
                onClick={handleClick}
                className="CheckboxComponent__grid-item1 CheckboxComponent__svg"
                viewBox="0 0 100 100">
                <path className="CheckboxComponent__check_box" d="M82,89H18c-3.87,0-7-3.13-7-7V18c0-3.87,3.13-7,7-7h64c3.87,0,7,3.13,7,7v64C89,85.87,85.87,89,82,89z" />
                <polyline className="CheckboxComponent__check_mark" points="25.5,53.5 39.5,67.5 72.5,34.5"
                />
            </svg>
            <div className="CheckboxComponent__grid-item2">
                <label className="CheckboxComponent__label" htmlFor={name + id}>{label}</label>
            </div>
        </div>
    );
};

export default CheckboxComponent;
