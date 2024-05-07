import {useEffect, useRef, useState} from "react";
import "./FileUploaderComponent.scss";
import {FormikProps} from "formik";

type FileUploaderComponentPropsType = {
    labelButton: string;
    disabled?: boolean;
    acceptFile?: string;
    prevFile?: File;
    isRequired?: boolean;
} & (| {
    //se abbiamo l'oggetto formik i campi sotto non serve passarli
    formik: FormikProps<any>
    handleFile?: never; initFileInput?: never;
} | {
    formik?: never
    initFileInput?: { init: boolean; setInit: (b: boolean) => void }; handleFile: (file: any) => void,
});


/**
 * FileUploaderComponent
 * @param {function} handleFile - the handleFile function to call when the user change the file
 * @param {string} labelButton - the label of the button
 * @param {boolean} disabled - if true disable the button
 * @param acceptFile
 * @param prevFile
 * @param formik
 * @param isRequired
 * @param initFileInput
 * @returns {JSX.Element}
 */
const FileUploaderComponent = ({
                                   handleFile,
                                   labelButton,
                                   disabled = false,
                                   acceptFile = "*",
                                   prevFile = undefined,
                                   formik,
                                   isRequired = false,
                                   initFileInput
                               }: FileUploaderComponentPropsType) => {
    const hiddenFileInput = useRef<any>(null);
    const [file, setFile] = useState<File | undefined>(prevFile);

    const handleClick = () => {
        hiddenFileInput.current.click();
    };

    const handleFormik = (newFile: File | undefined) => {
        formik?.setFormikState((oldState: any) => {
            const newState = {...oldState};
            newState.values["file"] = newFile;
            return newState;
        });
        formik?.setFieldError("file", "");
    };

    const handleChange = (event: any) => {
        const fileUploaded = event.target.files[0];
        if (typeof handleFile === "undefined" && !formik) {
            return;
        }
        if (formik) {
            handleFormik(fileUploaded);
        } else if (handleFile) {
            handleFile(fileUploaded);
        }
        setFile(fileUploaded);
    };

    const delFile = () => {
        if (handleFile) {
            handleFile(undefined);
        } else if (formik) {
            handleFormik(undefined);
        }
        setFile(undefined);
    };

    useEffect(() => {
        /**
         * inizializzare il fileInput appena effettuato l'inserimento
         */
        if (initFileInput?.init) {
            delFile();
            initFileInput.setInit(false);
        }
    }, [initFileInput?.init]);

    const getFileElement = (newFile: File | undefined) => {
        return (
            newFile &&
            <>
                <div className="col-auto my-auto">
                    <label>
                        {newFile.name}
                    </label>
                </div>
                <div className="col-auto my-auto">
                    <i className="bi bi-trash FileUploaderComponent__trash-icon" onClick={() => delFile()}></i>
                </div>
            </>
        );
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
                    value={""}
                />
            </div>
            {formik ? getFileElement(formik?.values?.file) : getFileElement(file)}
        </div>
    );
};

export default FileUploaderComponent;
