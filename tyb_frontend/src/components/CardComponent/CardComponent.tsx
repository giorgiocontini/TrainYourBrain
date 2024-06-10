/**
 * Libs
 */
import React, {useContext, useRef} from "react";

/**
 * Core
 */
import "./CardComponent.scss";
import {CardComponentConfig} from "./CardTypes";
import {generateRandomRGB} from "../PlotComponent/PlotComponent";
import {AuthContext} from "../../AuthContext";
import QuizClient from "../../services/API/openapicode_tyb_user/QuizClient";
import {showDialogConfirmOperation, showDialogFailed} from "../../utils/DialogUtils";
import {useNavigate} from "react-router-dom";


type CardComponentProps = {
    config: CardComponentConfig;
};
/**
 * CardComponent

 * @returns JSX
 * @param key
 * @param config
 */
const CardComponent = ({config}: CardComponentProps) => {

    const button1Ref: any = useRef(null);
    const navigate = useNavigate()

    const {isInRole} = useContext(AuthContext)

    const showHideFunction = () => {
        QuizClient.showHideQuizUsingPut(config.id).then(
            res => {
                //showDialogSuccess(res?.data?.esito || "", res.data.descrizione);
                if (config.onHidden) {
                    config.onHidden()
                }
            }
        ).catch(error => {
            showDialogFailed(error?.response?.data?.esito?.descrizione || "");
        });
    }

    const deleteFunction = () => {
        QuizClient.deleteQuizUsingDelete(config.id).then(
            res => {
                //showDialogSuccess(res?.data?.esito || "", res.data.descrizione);
                if (config.onDelete) {
                    config.onDelete()
                }
            }
        ).catch(error => {
            showDialogFailed(error?.response?.data?.esito?.descrizione || "");
        });
    }

    return (
        <div key={config.id} className={"CardComponent "}>
            <article className={"Card " + config.status}>
                <header className="cardHeader">
                    <div style={{width: '100%', height: '100%', position: 'relative'}}>
                        {config.image ? (
                            <img src={config.image} alt="Card Image" style={{
                                width: '100%', height: '100%', objectFit: 'cover',
                                objectPosition: 'center'
                            }}/>
                        ) : (
                            <div style={{backgroundColor: generateRandomRGB(), width: '100%', height: '100%'}}></div>
                        )}
                    </div>
                </header>
                <footer className="cardFooter">
                    <div className="cardText">
                        <h3 className="cardTitle">
                            {config.title}
                        </h3>
                        <p className="cardSubtitle">
                            {config.description}
                        </p>
                    </div>
                    {config?.button1 ?
                        <div className={"d-flex justify-content-between gap-1"}>
                            <button
                                key={"button1_" + config?.id}
                                ref={button1Ref}
                                className={"Button-style btn btn-primary b-0"}
                                disabled={config.isHidden}
                                onClick={() => {
                                    if (config.button1) {
                                        config.button1.onClick();
                                    }
                                }}
                            >
                            <span
                                className="Label-button-style">{config.button1.label ? config.button1.label : "Procedi"}</span>
                            </button>
                            {isInRole("A") ?
                                <>
                                    <button
                                        key={"delete_1_" + config?.id}
                                        className={"btn btn-outline-secondary px-2 "}
                                        disabled={false}
                                        onClick={() => {
                                            //hide-show
                                            showHideFunction();
                                        }}
                                        title={config.isHidden ? "Mostra quiz" : "Nascondi quiz"}
                                    >
                            <span
                                className="Label-button-style">
                                <i className={config.isHidden ? "bi bi-eye-fill" : "bi bi-eye-slash-fill"}></i>
                                </span>
                                    </button>
                                    <button
                                        key={"delete_1_" + config?.id}
                                        className={"btn btn-danger px-2"}
                                        disabled={false}
                                        onClick={() => {
                                            // delete

                                            showDialogConfirmOperation("Attenzione", "Confermi di voler eliminare il quiz?", deleteFunction)

                                        }}
                                        title={"Elimina quiz"}
                                    >
                            <span
                                className="Label-button-style"><i className="bi bi-trash"></i></span>
                                    </button>
                                </> : <></>}

                        </div>

                        :
                        null
                    }
                </footer>
            </article>
        </div>
    );
};

export default CardComponent;
