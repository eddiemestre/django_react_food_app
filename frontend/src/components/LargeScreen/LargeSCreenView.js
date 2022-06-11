import React from "react";
import './LargeScreenView.css'
import Header from "../Header/index";

const LargeScreenView = () => {
    return (
        <div className="grid-container">
            {/* <div className="header">The Food App</div> */}
            <Header />
            <div className="center-module">
                <div className="inside-module">
                    <div className="inside-text">
                        The Food App is best experienced on a mobile device in portrait mode.  Please come back on one to check it out!
                    </div>
                </div>
            </div>
            <div className="footer">© The Food App, Inc. 2022</div>
        </div>
    );
};

export default LargeScreenView;