import "./FileUploadedComponent.scss";

type FileUploadedComponentPropsType = {
    label?: string;
    value?: string;
    field: string;
    removeFile: (field: string) => void;
    isRequired?: boolean;
}

/**
 * FileUploadedComponent
 * @param {string} label the label of the section
 * @param {string} value the value of the file uploaded
 * @param {string} field the field of the file uploaded
 * @param {function} removeFile the removeFile function to call when the user click on trash icon
 * @param {boolean} isRequired boolean, if true the field is required
 * @returns {JSX.Element}
 */
const FileUploadedComponent = ({ label, value, field, removeFile, isRequired }: FileUploadedComponentPropsType): JSX.Element => {
    const classNames = {
        "FileUploadedComponent__title": ["FileUploadedComponent__title"]
    };
    if (isRequired) {
        classNames["FileUploadedComponent__title"].push("required");
    }

    return (
        <div className="FileUploadedComponent">
            {label && <label htmlFor={label} className={classNames["FileUploadedComponent__title"].join(" ")}>{label}</label>}
            <div
                id={label}
            >
                <label className="FileUploadedComponent__labelFile">
                    {value}
                    <i className="bi bi-trash FileUploadedComponent__icon" onClick={() => removeFile(field)}></i>
                </label>
            </div>
        </div>
    );
};

export default FileUploadedComponent;
