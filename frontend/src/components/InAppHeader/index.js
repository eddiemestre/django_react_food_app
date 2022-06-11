import React, {useState} from "react";
import { HeadContainer, AppName, Icon } from './Styles.js';

const InAppHeader = () => {

    return(
        <HeadContainer>
            <AppName>The Food App</AppName>
            <Icon><i className="ri-logout-box-r-line" onClick={event => window.location.href='/login'}></i></Icon>
        </HeadContainer>
    );
}

export default InAppHeader;