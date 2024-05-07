import Swal from "sweetalert2";

const SwalDUPopup = Swal.mixin({
    reverseButtons: true,
    confirmButtonColor: "#0066CC",
    cancelButtonColor: "#aeaeae"
});

const showDialogSuccess = (title: string, text: string, FunctionByConfirm?: Function) => {
    SwalDUPopup.fire({
        icon: "success",
        title: title,
        text: text,
    }).then((result) => {
        console.log("result", result);
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            if(FunctionByConfirm) {
                FunctionByConfirm();
            }
        }
    });
};

const showDialogFailed = (errorMsg: string, errorCode?: string) => {
    //errorMsg = errorMsg && errorMsg.includes("Errore:") ? errorMsg.split("Errore: ")[1] : errorMsg;
    SwalDUPopup.fire({
        icon: "error",
        title: errorCode ? errorCode : "",
        html: "<span style='white-space: pre-line'>" + errorMsg + "</span>",
    });
};


const showDialogInfo = (titleInfo: string, infoMsg: string, FunctionByConfirm: Function) => {
    SwalDUPopup.fire({

        icon: "info",
        title: titleInfo,
        html:  infoMsg ,
        allowOutsideClick: false,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            FunctionByConfirm(true);
        } else if (result.isDenied) {
            FunctionByConfirm(false);
        }
    });
};

export {showDialogFailed, showDialogSuccess, SwalDUPopup, showDialogInfo};
