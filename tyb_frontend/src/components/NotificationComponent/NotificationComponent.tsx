import React, {FC, ReactNode} from 'react';
import './NotificationComponent.scss';


interface NotificationComponentProps {
    type: "info" | "error" | "warning" | "success",
    messages: string | string[],
    show?: boolean,
    className?: string,
    closable?: boolean,
    children?: ReactNode,
    cbClose?: any,
    noIcon?: boolean
}

/**
 * Notification bar component for displaying customizable notifications
 * @param type type of notification can be ('success', 'error', 'info', 'warning')
 * @param text messages to display
 * @param className className customizable
 * @param show remove the hidden display
 * @param closable can be closable
 * @param children ReactNode
 * @param cbClose to close notification
 * @param noIcon not use icon
 * @constructor
 */

const NotificationComponent: FC<NotificationComponentProps> = ({
                                                                   type,
                                                                   messages,
                                                                   className,
                                                                   show = true,
                                                                   closable,
                                                                   children,
                                                                   cbClose,
                                                                   noIcon
                                                               }: NotificationComponentProps) => {

    if (typeof messages === 'string') {
        messages = [messages]
    }

    const classNames = {
        "NotificationComponent": ["NotificationComponent", "col mb-5 mb-md-0 h-100"],
        "NotificationComponent__notify": ["NotificationComponent__notify", "notification with-icon p-2 ps-3 ", className],
        "NotificationComponent__icon": ["fs-5 d-inline"]
    };

    if (type === "success") {
        classNames["NotificationComponent__icon"].push("bi bi-check-circle messages-success text-success");
    } else if (type === "warning") {
        classNames["NotificationComponent__icon"].push("bi bi-exclamation-octagon messages-warning text-warning")
    } else if (type === "error") {
        classNames["NotificationComponent__icon"].push("bi bi-x-circle messages-danger text-danger")
    } else if (type === "info") {
        classNames["NotificationComponent__icon"].push("bi bi bi-info-circle messages-primary text-primary")
    }

    if (show) {
        classNames["NotificationComponent__notify"].push("d-flex")
        classNames["NotificationComponent__notify"].push(type)
    }

    return (<div className={classNames["NotificationComponent"].join(" ")}>
        <div className={classNames["NotificationComponent__notify"].join(" ")}
             role="alert"
             aria-labelledby="text_notify"
             id="notify">
            <div id="text_notify" className="NotificationComponent__flex">
                {!noIcon ? <i className={classNames["NotificationComponent__icon"].join(" ")}/> : null}
                <div className="d-flex flex-column">
                    {messages.map((message, index) => {
                        return message ? <div key={"message" + index}
                                              className="d-flex justify-content-center align-items-center w-100">
                            <h6 className="m-0 ms-2 w-100 text-break">{message}</h6>
                        </div> : <></>
                    })}
                </div>

                {closable ? <button className="btn ms-auto" onClick={cbClose}>
                    <i className="bi bi-x-lg"/>
                </button> : null}
            </div>

            {children}
        </div>
    </div>);

}

export default NotificationComponent;
