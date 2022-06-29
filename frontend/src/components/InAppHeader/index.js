import React, {useState} from "react";
import { HeadContainer, AppName, Icon, SvgContainer } from './Styles.js';
import { useTransition, animated } from '@react-spring/web';
import { MenuBackground, MenuContainer } from "./Styles.js";
import MenuModal from "../Menu/index.js";

const InAppHeader = () => {

    const [menuOpened, setMenuOpened] = useState(false)


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

    return(
        <>
            <HeadContainer>
                <AppName onClick={event => window.location.href=`/profile/${JSON.parse(localStorage.getItem('email'))}`}>The Food App</AppName>
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