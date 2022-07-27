import React, {useState, useEffect} from "react";
import { HeadContainer, AppName, SvgContainer, MenuBackground, MenuContainer } from './Styles.js';
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";
import { useTransition } from '@react-spring/web';
import MenuModal from "../Menu/index.js";

const InAppHeader = () => {
    const navigate = useNavigate();
    const { auth } = useAuth();
    const [menuOpened, setMenuOpened] = useState(false)


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
        if (auth?.username) {
            navigate(`/user/${auth?.username}/`)
        } else {
            navigate('/')
        }
        
    }

    return(
        <>
            <HeadContainer>
                <AppName onClick={() => handleHeaderClick()}>The Food App</AppName>
                <SvgContainer onClick={handleClick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" fill="rgba(255,255,255,1)"/></SvgContainer>
            </HeadContainer>
            {fadeMenuBkg((style, item) =>
                item ? <MenuBackground style={style}/> : '' )}
            {menuAppear((style, item) => 
                item ? <MenuContainer style={style}>
                <MenuModal setMenuOpened={setMenuOpened}/>
                </MenuContainer> : '')}
        </>
    );
}

export default InAppHeader;