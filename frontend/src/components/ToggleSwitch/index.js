import React, {useState, useEffect} from "react";
import "./Styles.css";
import { useOutletContext } from "react-router-dom";

const ToggleSwitch = (props) => {
    const [selectedReview, setSelectedReview] = useOutletContext();
    const [isPrivate, setIsPrivate] = useState(selectedReview.private ? true : false || false)

    // function toggle(checked) {
    //     var elm = document.getElementsByClassName('checkbox');
    //     if (checked != elm.checked) {
    //         elm.click()
    //     }
    // }

    useEffect(() => {
        console.log("inside toggle", selectedReview.private)
        console.log("is checked", isPrivate)
    }, [isPrivate])
    
    // document.getElementByClassName('checkbox').checked = true;

    // const [isPublic, setIsPublic] = useState(!selectedReview.private || true);

    const triggerToggle = () => {
        // setIsPublic(!isPublic);
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
