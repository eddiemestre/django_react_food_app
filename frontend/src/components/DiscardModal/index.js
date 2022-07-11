import React, {useState, useEffect} from "react";
import { CloseModalContainer, Discard, Yes, No } from './Styles.js';

const DiscardModal = (props) => {
    const [modalText, setModalText] = useState("Discard Review?")

    useEffect(() => {
        if (props.type === "create") {
            setModalText("Discard review?")
        } else if (props.type === "edit") {
            setModalText("Discard changes?")
        } else {
            setModalText("Delete review? This cannot be undone.")
        }
    }, [])

    return (
        <CloseModalContainer>
            <Discard>{modalText}</Discard>
            <Yes onClick={() => props.clickYes()}>Yes</Yes>
            <No onClick={() => props.clickNo()}>No</No>
        </CloseModalContainer>
    );
};

export default DiscardModal;