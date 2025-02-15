/**
 * Libs
 */
import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

/**
 * Locals
 */
import "./ModalsPortal.scss";
import {showDialogFailed} from "../../utils/DialogUtils";

/**
 * Types
 */
type ModalPropsType = {
    display: boolean,
    element: ReactNode,
    classCustom?: any,
    styleCustom?:any
};

/**
 * ModalPortal component
 *
 * @param {any} children
 * @returns ReactPortal
 */
const ModalPortal = ({ display, element, classCustom, styleCustom}: ModalPropsType) => {
    const elRef = useRef<any>(null);
    if (!elRef.current) {
        elRef.current = document.createElement("div");
        elRef.current.setAttribute("class", "ModalPortal");
    }

    /**
     * Handle mount of modal on portal load
     */
    useEffect(() => {
        const modalRootEl = document.getElementById("modal-root");
        // TYPE DEFF: if there is no div with id "modal-root", in the document, then return. Otherwise proceed.
        if (modalRootEl === null) {
            // SQ cries that we must return a value, but in defensive programming we don't want to return anything, as this effect should not pass.
            // I suggest we use `return undefined`, which is equal to `return`
            //console.error("modalRootEl is null");
            return undefined;
        }

        if (!modalRootEl.contains(elRef.current)) {
            //console.error("elRef.current is not a child of modalRootEl");
            modalRootEl.appendChild(elRef.current);
        }

        return () => {
            //controllo che il modalRoot abbia almeno un figlio e che questo sia l'elemento corrente
            if (modalRootEl.firstChild && modalRootEl.firstChild===elRef.current){

                try {
                    modalRootEl.removeChild(elRef.current);
                } catch (error) {
                    showDialogFailed("", "Si è verificato un errore, si prega di ricaricare la pagina")
                    console.error("Si è verificato un errore, si prega di ricaricare la pagina");
                }
            }
        };
    }, []);

    return createPortal(
        <div className={`ModalsPortal__wrapper ${
            display ? "open" : "closed"
            } ${classCustom}`}
        >
            <div className="ModalsPortal__backdrop" > s</div>
            <div className="ModalsPortal__container container p-5" style={styleCustom}>
                {element}
            </div>
        </div>,
        elRef.current
    );
};

/**
 * Default export
 */
export default ModalPortal;
