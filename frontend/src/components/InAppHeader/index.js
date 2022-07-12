import React, {useState} from "react";
import { HeadContainer, AppName, Icon, SvgContainer } from './Styles.js';
import { useTransition, animated } from '@react-spring/web';
import { MenuBackground, MenuContainer } from "./Styles.js";
import MenuModal from "../Menu/index.js";
import useAuth from "../../hooks/useAuth.js";
import { useNavigate } from "react-router-dom";

const InAppHeader = () => {
    const [menuOpened, setMenuOpened] = useState(false)
    const { auth } = useAuth();
    const navigate = useNavigate();

    const exitMenu = () => {
        setMenuOpened(false)
    }

    const handleClick = () => {
        setMenuOpened(true)
    }

    const menuAppear = useTransition(menuOpened, {
        from: {x: 500},
        enter: {x: 0},
        leave: {x: 500},
    });

    const fadeMenuBkg = useTransition(menuOpened, {
        from: { opacity: 0 },
        enter: {opacity: 0.5},
        leave: {opacity: 0 },
    });

    const handleHeaderClick = () => {
        if (JSON.parse(localStorage.getItem('username')) && auth) {
            console.log("in user logged in handle click")
            window.location.href = `/user/${JSON.parse(localStorage.getItem('username'))}`
        } else {
            navigate(`/login`)
        }
    }

    return(
        <>
            <HeadContainer>
                <AppName onClick={() => handleHeaderClick()}>The Food App</AppName>
                {/* <Icon><i className="ri-logout-box-r-line" onClick={event => window.location.href='/login'}></i></Icon> */}
                {/* <Icon><i className="ri-logout-box-r-line" onClick={handleClick}></i></Icon> */}
                <SvgContainer onClick={handleClick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" fill="rgba(255,255,255,1)"/></SvgContainer>
            </HeadContainer>
            {fadeMenuBkg((style, item) =>
                item ? <MenuBackground style={style}/> : '' )}
            {menuAppear((style, item) => 
                item ? <MenuContainer style={style}>
                <MenuModal onClick={exitMenu}/>
                </MenuContainer> : '')}
        </>
    );
}

export default InAppHeader;