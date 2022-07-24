import React from "react";
import { CloseModalContainer, Discard, Yes, No } from './Styles.js';

const DiscardModal = ({type, clickYes, clickNo}) => {

    const messages = {
        create: "Discard review?",
        edit: "Discard changes?",
        delete: "Delete review? This cannot be undone."
      };

    return (
        <CloseModalContainer>
            <Discard>{messages[type]}</Discard>
            <Yes onClick={() => clickYes()}>Yes</Yes>
            <No onClick={() => clickNo()}>No</No>
        </CloseModalContainer>
    );
};

export default DiscardModal;