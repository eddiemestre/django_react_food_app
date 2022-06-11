import React, {useState} from "react";
import "./Styles.css";

const ToggleSwitch = (props) => {

    // function toggle(checked) {
    //     var elm = document.getElementsByClassName('checkbox');
    //     if (checked != elm.checked) {
    //         elm.click()
    //     }
    // }
    
    // document.getElementByClassName('checkbox').checked = true;

    const [isPublic, setIsPublic] = useState(true);

    const triggerToggle = () => {
        setIsPublic(!isPublic);
        props.setIsPrivate(isPublic);
        console.log(isPublic);
        props.change(true)
    }


    return (
        <div className="container">
        <div className="toggle-switch" onChange={(triggerToggle)}>
            <input type="checkbox" className="checkbox"
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
