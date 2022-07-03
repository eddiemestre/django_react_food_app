import React, {useEffect, useState} from "react";
import { useTransition, animated } from '@react-spring/web';
import {GlobalStyle, GridContainer, Add, Test1, Test2, Test3, Trans, SvgTest, FaderDiv, FaderDivClose } from './Styles.js';
import "./Styles.css";
import {ReactComponent as PlusSvg} from '../../svg/plus_icon.svg';
import TestSvg from '../../svg/test.svg';

import { useParams, useOutletContext } from "react-router-dom";

import LargeScreenView from "../../components/LargeScreen/LargeSCreenView";
import InAppHeader from "../../components/InAppHeader/index.js";
import ReviewList from "../../components/ReviewList/index.js";
import ReviewModule from "../../components/ReviewModule/index.js";
import DiscardModal from "../../components/DiscardModal/index.js";
import MenuModal from "../../components/Menu/index.js";
import useRefreshToken from "../../hooks/useRefreshToken.js";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";

const Home = () => {
    const [reviewModuleActive, setReviewModuleActive] = useState(false)
    const [fill, setFill] = useState('#03dac6')
    const [stroke, setStroke] = useState('black')
    const [inputHasChanged, setInputHasChanged] = useState(false)
    const [faderDivOpened, setFaderDivOpen] = useState(false)
    const [discardModal, setDiscardModal] = useState(false)
    const [menuOpened, setMenuOpened] = useState(false)
    const [reviewSaved, setReviewSaved] = useState(false)
    const axiosPrivate = useAxiosPrivate();
    const params = useParams();
    const context = useOutletContext();

    const listView = (
        <Test1 is_hidden={reviewModuleActive}>
            <ReviewList wasSaved={reviewSaved} setReview={context[5]}/>
        </Test1>
    )

    const backgroundDiv = (
        <FaderDiv modal_opened={reviewModuleActive} />
    )

    // const toggleReview = () => {
    //     if (!reviewModuleActive) {
    //         setFill('#C56679')
    //         setStroke('white')
    //     }
    //     // else {
    //     //    setFill('#03dac6')
    //     //    setStroke('black')
    //     //    const scrollY = document.body.style.top;
    //     //    window.scrollTo(0, parseInt(scrollY || '0') * -1);
    //     // }
    // }

    useEffect(() => {
        // is this what we want here?
        console.log("context", context[5])
        const getUserData = async () => {


            try {
                const response = await axiosPrivate.get('/auth/get_user/')
        
                // console.log("in get user response", response?.data[0]);
                // console.log("email", response?.data[0]?.email)

                localStorage.setItem('email', JSON.stringify(response?.data[0]?.email))
                localStorage.setItem('user_id', JSON.stringify(response?.data[0]?.id))
                localStorage.setItem('username', JSON.stringify(response?.data[0]?.username))
                localStorage.setItem('name', JSON.stringify(response?.data[0]?.name))
                
        
              } catch (err) {
                console.log(err);
              }
        }

        if (!localStorage.getItem('username')) {
            getUserData();
        }

    }, [])

    const toggleReviewOn = () => {
        setFill('#C56679')
        setStroke('white')
    }

    const toggleReviewOff = () => {
        setFill('#03dac6')
        setStroke('black')
        const scrollY = document.body.style.top;
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }

    const ModalConditions = () => {

        if (reviewModuleActive === false) {
            console.log("review modal false, changing to true")
            toggleReviewOn()
            setReviewModuleActive(true)
            
        } else {
            if (inputHasChanged === false) {
                console.log("reivew modal true, changing to false. No changes detected")
                toggleReviewOff()
                setReviewModuleActive(false)
                
            } else {
                console.log("Discard Modal false, changing to True")
                setDiscardModal(true)
            }
        }
    }

    const clickYes = () => {
        toggleReviewOff()
        setDiscardModal(false)
        setReviewModuleActive(false)
        setInputHasChanged(false)
    }

    const clickNo = () => {
        setDiscardModal(false)
    }

    const exitMenu = () => {
        setMenuOpened(false)
    }

    // const ModalView = (
    //     <CloseModalContainer onClick={() => setInputHasChanged(false)}/>
    // )
    
    // const reviewInfoView = (
    //     <Test2>
    //         <ReviewModule />
    //     </Test2>
    // )

    // const AnimatedReviewModule = animated(ReviewModule)

    // const testAnimation = ({className}) => (
    //     <CSSTransition
    //                 in={reviewModuleActive}
    //                 appear={true}
    //                 timeout={600}
    //                 classNames={className}
    //             >
    //                 <Test2/>
    //             </CSSTransition>
    // )

    // use State for whether X is clicked or not
    // two functions, one for the review list view, and one for the review module view


    const slideAnimation = useTransition(reviewModuleActive,  {
        from: {y: 1000},
        enter: {y: 0},
        leave: {y: 1000},
    });

    const fadeAnimation = useTransition(reviewModuleActive, {
        from: { opacity: 0 },
        enter: {opacity: 0.5},
        leave: {opacity: 0 },
    });

    const fadeAnimationTwo = useTransition(discardModal, {
        from: { opacity: 0 },
        enter: {opacity: 0.5},
        leave: {opacity: 0 },
    });

    const modalAppear = useTransition(discardModal, {
        from: { opacity: 0, transform: "translateY(-20px)" },
        enter: { opacity: 1, transform: "translateY(0px)" },
        leave: { opacity: 0, transform: "translateY(-20px)" },
    });

    // const menuAppear = useTransition(menuOpened, {
    //     from: {x: 500},
    //     enter: {x: 0},
    //     leave: {x: 500},
    // });

    // const fadeMenuBkg = useTransition(menuOpened, {
    //     from: { opacity: 0 },
    //     enter: {opacity: 0.5},
    //     leave: {opacity: 0 },
    // });


    // const style = {
    //     transform: reviewModuleActive ? 'rotate(45deg)' : '',
    //     transition: 'transform 150ms ease',
    // }
    return (
        <>
            <GlobalStyle modal_opened={reviewModuleActive} menu_opened={menuOpened}/>
            <LargeScreenView />
            <GridContainer is_hidden={reviewModuleActive} menu_opened={menuOpened}>
                {/* <InAppHeader openMenu={setMenuOpened} /> */}
                {listView}
            </GridContainer>
            {/* {fadeAnimation((style, item) =>
                item ? <FaderDiv style={style}/> : ''
            )}
            {slideAnimation((style, item) => 
                    item ? <Test2 style={style}><ReviewModule setToggle={toggleReviewOff} setSaved={setReviewSaved} setModuleActive={setReviewModuleActive} hasChanged={setInputHasChanged}></ReviewModule></Test2> : ''
                )} */}
            {/* <SvgTest isActive={reviewModuleActive} onClick={() => {ModalConditions()}} id="efXkrK1xpLH1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 640 480" shapeRendering="geometricPrecision" textRendering="geometricPrecision"><ellipse rx="239.999999" ry="239.999999" transform="translate(320 239.999999)" fill={fill} strokeWidth="0"/><line x1="0" y1="-100.45977" x2="0" y2="100.45977" transform="matrix(0 1-1 0 320 240)" fill="none" stroke={stroke} strokeWidth="10"/><line x1="0" y1="-100.45977" x2="0" y2="100.45977" transform="translate(320 239.999999)" fill="none" stroke={stroke} strokeWidth="10"/></SvgTest> */}
            
             {/* {fadeAnimationTwo((style, item) =>
            item ? <FaderDivClose style={style}/> : '' )}
            {discardModal && (modalAppear((style, item) => item ? <Test3 style={style}><DiscardModal clickYes={clickYes} clickNo={clickNo}/></Test3> : ''))} */}
            {/* {fadeMenuBkg((style, item) =>
            item ? <MenuBackground style={style}/> : '' )}
            {menuAppear((style, item) => 
            item ? <MenuContainer style={style}>
                        <MenuModal onClick={exitMenu}/>
                    </MenuContainer> : '')} */}
        </>
    );
};

export default Home;