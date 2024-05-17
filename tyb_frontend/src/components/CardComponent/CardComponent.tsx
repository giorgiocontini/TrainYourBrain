/**
 * Libs
 */
import React, {useContext, useRef} from "react";

/**
 * Core
 */
import "./CardComponent.scss";
import {CardComponentConfig} from "./CardTypes";
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

    const button1Ref: any = useRef(null);

    debugger
    return (
        <div key={config.id} className="CardComponent">
            <article className={"Card " + config.status}>
                <header className="cardHeader">

                    <img src={config.image} alt="Card Image"/>

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
                        <button
                            key={"button1_" + config?.id}
                            ref={button1Ref}
                            className={"Button-style btn btn-primary"}
                            disabled={false}
                            onClick={() => {
                                if (config.button1) {
                                    config.button1.onClick();
                                }
                            }}
                        >
                            <span
                                className="Label-button-style">{config.button1.label ? config.button1.label : "Procedi"}</span>
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
