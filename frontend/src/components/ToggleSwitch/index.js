import React, {useState, useEffect} from "react";
import "./Styles.css";
import { useOutletContext } from "react-router-dom";

const ToggleSwitch = (props) => {
    const [selectedReview, setSelectedReview] = useOutletContext();
    const [isPrivate, setIsPrivate] = useState(selectedReview.private ? true : false || false)


    const triggerToggle = () => {
        setIsPrivate(!isPrivate)
        props.setIsPrivate(!isPrivate);
        console.log(isPrivate);
        props.change(true)
    }


    return (
        <div className="container">
        <div className="toggle-switch">
            <input checked={isPrivate} onChange={triggerToggle} type="checkbox" className="checkbox"
                name={props.label} id={props.label}/>
            <label className="label" htmlFor={props.label}>
                <span className="inner" />
                <span className="switch" />
            </label>
        </div>
        </div>
    );
};

export default ToggleSwitch;
