import React from "react";
import "./Styles.css";

const ToggleSwitch = ({ isPrivate, setIsPrivate, setInputHasChanged, label }) => {

    const triggerToggle = () => {
        setIsPrivate(!isPrivate)
        // // console.log(isPrivate);
        setInputHasChanged(true)
    }


    return (
        <div className="container">
        <div className="toggle-switch">
            <input checked={isPrivate} onChange={triggerToggle} type="checkbox" className="checkbox"
                name={label} id={label}/>
            <label className="label" htmlFor={label}>
                <span className="inner" />
                <span className="switch" />
            </label>
        </div>
        </div>
    );
};

export default ToggleSwitch;
