/**
 * Locals
 */
import "./PageDescription.scss";

/**
 * Types
 */
type PageDescriptionProps = {
    description: string;
    className?: string;
};

/**
 * PageDescription component
 *
 * @param {string} description the description of the page
 * @param {string} className the className of the component
 * @returns {JSX.Element}
 */
const PageDescription = ({
    description = "Page Description",
    className
}: PageDescriptionProps) => {
    const _className = ["PageDescription"];
    if (typeof className !== "undefined") {
        const temp = className.split(" ");
        _className.push(...temp);
    }

    return (
        <div className={_className.join(" ")}>
            <p>{description}</p>
        </div>
    );
};

export default PageDescription;
