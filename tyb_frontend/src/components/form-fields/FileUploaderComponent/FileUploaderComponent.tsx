import { useRef, useState } from "react";
import "./FileUploaderComponent.scss";

type FileUploaderComponentPropsType = {
    handleFile: (file: any) => void;
    labelButton: string;
    disabled?: boolean;
    acceptFile?: string;
    prevFile?: File | undefined;
    isRequired?: boolean;
}

/**
 * FileUploaderComponent
 * @param {function} handleFile - the handleFile function to call when the user change the file
 * @param {string} labelButton - the label of the button
 * @param {boolean} disabled - if true disable the button
 * @returns {JSX.Element}
 */
const FileUploaderComponent = ({ handleFile, labelButton, disabled = false, acceptFile = "*", prevFile = undefined, isRequired = false }: FileUploaderComponentPropsType) => {
    const hiddenFileInput = useRef<any>(null);
    const [file, setFile] = useState<File | undefined>(prevFile);

    const handleClick = () => {
        hiddenFileInput.current.click();
    };

    const handleChange = (event: any) => {
        const fileUploaded = event.target.files[0];
        handleFile(fileUploaded);
        setFile(fileUploaded);
    };

    const delFile = () => {
        handleFile(undefined);
        setFile(undefined);
    };

    return (
        <div className="row">
            <div className="col-auto">
                <button
                    className="FileUploaderComponent__upload-btn btn btn-outline-primary me-2"
                    onClick={() => handleClick()}
                    disabled={disabled}
                >
                    <i className="bi bi-upload"></i>
                    <p className={isRequired ? "FileUploaderComponent__upload-btn_required" : ""}>{labelButton}</p>
                </button>
                <input
                    type="file"
                    ref={hiddenFileInput}
                    accept={acceptFile}
                    onChange={(e) => handleChange(e)}
                    className={"d-none"}
                />
            </div>
            {file &&
                <>
                    <div className="col-auto my-auto">
                        <label>
                            {file.name}
                        </label>
                    </div>
                    <div className="col-auto my-auto ms-auto">
                        <i className="bi bi-trash FileUploaderComponent__trash-icon" onClick={() => delFile()}></i>
                    </div>
                </>}
        </div>
    );
};

export default FileUploaderComponent;
