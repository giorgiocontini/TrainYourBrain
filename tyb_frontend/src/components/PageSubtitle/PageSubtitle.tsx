/**
 * Locals
 */
import "./PageSubtitle.scss";

/**
 * Types
 */
type PageSubtitleProps = {
    subtitle: string;
    classCustom?:string
};

/**
 * PageSubtitle component
 *
 * @param {string} subtitle the subtitle of the page
 * @param classCustom
 * @returns {JSX.Element}
 */
const PageSubtitle = ({ subtitle = "Page Subtitle", classCustom}: PageSubtitleProps): JSX.Element => (
    <div className={"PageSubtitle " + (classCustom ? classCustom :"")}>
        <p>{subtitle}</p>
    </div>
);

export default PageSubtitle;