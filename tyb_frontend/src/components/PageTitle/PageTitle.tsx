/**
 * Locals
 */
import "./PageTitle.scss";

/**
 * Types
 */
type PageTitleProps = {
    title: string;
};

/**
 * PageTitle
 *
 * @param {string} title the title of the page
 * @returns {JSX.Element}
 */
const PageTitle = ({ title = "Page Title" }: PageTitleProps) => (
    <div className="PageTitle">
        <h1>{title}</h1>
    </div>
);

export default PageTitle;
