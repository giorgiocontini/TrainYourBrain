import React, {ChangeEvent, useRef} from 'react';
import "./ImageFolderUploader.scss";


export interface ImageData {
    fileName: string;
    base64: string;
}

// Estendere l'elemento input per includere gli attributi non standard
interface ExtendedFileInput extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'webkitdirectory' | 'mozdirectory' | 'directory'> {
    webkitdirectory?: string;
    mozdirectory?: string;
    directory?: string;
}

interface ImagePropsType {
    setFolderState: Function,
    folderState: ImageData[]
    disabled: boolean,
    isRequired: boolean,
}

const ImageFolderUploader = ({folderState, setFolderState, disabled, isRequired}: ImagePropsType) => {

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const imageFiles: ImageData[] = [];
            for (const file of Array.from(files)) {
                if (file.type === "image/jpeg" || file.type === "image/png") {
                    const base64 = await fileToBase64(file);
                    imageFiles.push({
                        fileName: file.name?.split(".")[0],
                        base64
                    });
                }
            }
            setFolderState(imageFiles);
        }
    };

    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };
    const delFile = () => {
        setFolderState([])
    };

    const getFileElement = () => {
        return (
            <>
                <div className="col-auto my-auto">
                    <label>{`${folderState.length} immagini`}
                    </label>
                </div>
                <div className="col-auto my-auto">
                    <i className="bi bi-trash FileUploaderComponent__trash-icon" onClick={() => delFile()}></i>
                </div>
            </>
        );
    };

    const hiddenFileInput = useRef<any>(null);
    const handleClick = () => {
        hiddenFileInput.current.click();
    };
    return (
        <div className="d-flex flex-row" style={{alignItems: "center"}}>
            <button
                className="btn btn-outline-primary d-flex d-inline me-2"
                onClick={() => handleClick()}
                disabled={disabled}
            >
                <i className="bi bi-upload me-2"></i>
                <span
                    className={isRequired ? "FileUploaderComponent__upload-btn_required" : ""}>{"Carica cartella"}</span>

            </button>
            <input
                type="file"
                className={"d-none"}
                ref={hiddenFileInput}
                webkitdirectory=""
                mozdirectory=""
                directory=""
                multiple
                accept="image/jpeg, image/png"
                onChange={handleFileChange}
                {...({} as ExtendedFileInput)} // Cast dell'input per estendere gli attributi
            />
            {folderState.length > 0 && getFileElement()}


        </div>
    );
};

export default ImageFolderUploader;
