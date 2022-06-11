import React from "react";
import { CloseModalContainer, Discard, Yes, No } from './Styles.js';

const DiscardModal = (props) => {
    return (
        <CloseModalContainer>
            <Discard>Discard Review?</Discard>
            <Yes onClick={() => props.clickYes()}>Yes</Yes>
            <No onClick={() => props.clickNo()}>No</No>
        </CloseModalContainer>
    );
};

export default DiscardModal;