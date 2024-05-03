/**
 * Libs
 */
import React, {useContext, useEffect, useRef} from "react";

/**
 * Core
 */
import "./CardComponent.scss";
import {BadgeIconEnum, CardComponentConfig, CardStatusEnum} from "./CardTypes";
import {AppContext} from "../../AppContext";

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

    const {appText} = useContext(AppContext);
    const button1Ref: any = useRef(null);
    const button2Ref: any = useRef(null);

    return (
        <div key={config.id} className="CardComponent d-flex justify-content-center col-6 col-lg-4 col-xl-3">
            <article className={"Card " + config.status}>
                <header className="cardHeader" style={{ backgroundImage: `url(${config.image ? config.image : ""})`, height:"130px"}} >
                </header>
                <footer className="cardFooter">
                    <div className="cardText">
                        <h2 className="cardTitle">
                            {config.title}
                        </h2>
                        <p className="cardSubtitle">
                            {config.description}
                        </p>
                    </div>
                    {config?.button1 ?
                        //<button
                        //    key={"button1_" + config.button1 + "_" + config?.id}
                        //    ref={button1Ref}
                        //    className={"Button-style " + config.button1?.type}
                        //    disabled={config?.button1?.disabled ===undefined ?  config.status ===
                        //    CardStatusEnum.LOCKED : config?.button1?.disabled }
                        //    onClick={() => {
                        //        button1Ref?.current?.blur();
                        //        config.button1?.clickFunction();
                        //    }}
                        //>
                        //    <span className="Label-button-style">{config?.button1?.label}</span>
                        //</button>
                        <button
                            key={"button1_" + config?.id}
                            ref={button1Ref}
                            className={"Button-style btn btn-primary"}
                            disabled={false}
                            onClick={() => {
                                if (config.button1)
                                    config.button1.onClick();
                            }}
                        >
                            <span className="Label-button-style">{config.button1.label ? config.button1.label : "Procedi"}</span>
                        </button>

                        :
                        null
                    }
                </footer>
            </article>
        </div>
    );
};

export default CardComponent;
