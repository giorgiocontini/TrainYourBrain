import React from 'react';

import "./FooterComponent.scss";

interface FooterComponentProps {
}

const FooterComponent = ({}: FooterComponentProps) => {

    return <div className="FooterComponent mt-0">
        <footer className="footer-style align-items-center py-3  border-top fixed-bottom">
            <div className="container">
                TrainYourBrain
            </div>
        </footer>
    </div>
}

export default FooterComponent;
