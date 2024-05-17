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
import {generateRandomRGB} from "../PlotComponent/PlotComponent";


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

    return (
        <div key={config.id} className="CardComponent">
            <article className={"Card " + config.status}>
                <header className="cardHeader">

                    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                        {config.image ? (
                            <img src={config.image} alt="Card Image" style={{ width: '100%', height: '100%', objectFit: 'cover',
                                objectPosition: 'center'  }} />
                        ) : (
                            <div style={{ backgroundColor: generateRandomRGB(), width: '100%', height: '100%' }}></div>
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
