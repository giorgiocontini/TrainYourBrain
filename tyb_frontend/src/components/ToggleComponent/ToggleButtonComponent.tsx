/**
 * Locals
 */
import "./ToggleButtonComponent.scss";

/**
 * Types
 */
type Props = {
    flag: boolean;
    setFlag: (b: boolean) => void;
    option1: string;
    option2: string;
    customStyle?: string;
    inlineWithField?: boolean;
    disabled?: boolean;
};

/**
 * Toggle component
 *
 * @param {Props} params component props
 * @returns JSX
 */
const ToggleButtonComponent = ({
                                   flag,
                                   setFlag,
                                   option1,
                                   option2,
                                   customStyle,
                                   inlineWithField,
                                   disabled
                               }: Props): JSX.Element => {
    /**
     * Handle change
     */
    const handleChangeToggleButton = () => {
        setFlag(!flag);
    };

    return (
        <div
            className={
                inlineWithField ? "ToggleButton col-6 disabled mb-2" : "ToggleButton mb-2"
            }
            data-testid="ToggleButton"
        >
            <div className={!customStyle ? "flex col-12 " : customStyle}>
                <div className="choice-selector-container">
                    <div className="choice-selector-nav">
                        <input
                            type="radio"
                            name={"tab"}
                            id="option1"
                            checked={flag}
                            onChange={handleChangeToggleButton}
                            disabled={disabled ? disabled : false}
                        />
                        <input
                            type="radio"
                            name={"tab"}
                            id="option2"
                            checked={!flag}
                            onChange={handleChangeToggleButton}
                            disabled={disabled ? disabled : false}
                        />
                        <label htmlFor="option1" className="option1">
                            <p>{option1}</p>
                        </label>
                        <label htmlFor="option2" className="option2">
                            <p>{option2}</p>
                        </label>
                        <div className="tab" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToggleButtonComponent;