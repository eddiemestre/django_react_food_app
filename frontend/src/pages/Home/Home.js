import React, {useState} from "react";
import { useTransition, animated } from '@react-spring/web';
import {GlobalStyle, GridContainer, Add, Test1, Test2, Trans, SvgTest, FaderDiv } from './Styles.js';
import "./Styles.css";
import {ReactComponent as PlusSvg} from '../../svg/plus_icon.svg';
import TestSvg from '../../svg/test.svg';

import LargeScreenView from "../../components/LargeScreen/LargeSCreenView";
import InAppHeader from "../../components/InAppHeader/index.js";
import ReviewList from "../../components/ReviewList/index.js";
import ReviewModule from "../../components/ReviewModule/index.js";

const Home = () => {
    const [reviewModuleActive, setReviewModuleActive] = useState(false)
    const [fill, setFill] = useState('#03dac6')
    const [stroke, setStroke] = useState('black')

    const transition = useTransition(reviewModuleActive, {

    });
    const listView = (
        <Test1 is_hidden={reviewModuleActive}>
            <ReviewList />
        </Test1>
    )

    const backgroundDiv = (
        <FaderDiv modal_opened={reviewModuleActive} />
    )

    const toggleReview = () => {
        setReviewModuleActive(!reviewModuleActive)
        if (!reviewModuleActive) {
            setFill('#C56679')
            setStroke('white')
        }
        else {
           setFill('#03dac6')
           setStroke('black')
           const scrollY = document.body.style.top;
           window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
    }
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


    // const style = {
    //     transform: reviewModuleActive ? 'rotate(45deg)' : '',
    //     transition: 'transform 150ms ease',
    // }
    return (
        <>
            <GlobalStyle modal_opened={reviewModuleActive}/>
            <LargeScreenView />
            <GridContainer is_hidden={reviewModuleActive}>
                <InAppHeader />
                {/* {reviewModuleActive && reviewInfoView } */}
                {/* {slideAnimation((style, item) => 
                    item ? <Test2 style={style} /> : ''
                )} */}
                {listView}
                {/* <Footer /> */}
            </GridContainer>
            {/* {reviewModuleActive && backgroundDiv} */}
            {fadeAnimation((style, item) =>
                item ? <FaderDiv style={style}/> : ''
            )}
            {/* <FaderDiv modal_opened={reviewModuleActive}/> */}
            {slideAnimation((style, item) => 
                    item ? <Test2 style={style}><ReviewModule></ReviewModule></Test2> : ''
                )}
                {/* <CSSTransition
                    in={reviewModuleActive}
                    timeout={600}
                    classNames="fade"
                    unmountOnExit
                >
                    <Test2/>
                </CSSTransition> */}
            {/* <Add><i className="ri-close-circle-fill ri-5x" style={style} onClick={() => toggleReview()}></i></Add> */}
                {/* <Add><PlusSvg onClick={() => toggleReview()}/></Add> */}
                {/* <svg src={PlusSvg} className="svg" name="svgdefault" onClick={() => toggleReview()}/>
                <img src={PlusSvg} className="svg" name="svgdefault" onClick={() => toggleReview()}/> */}
                <SvgTest isActive={reviewModuleActive} onClick={() => {toggleReview()}} id="efXkrK1xpLH1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 640 480" shapeRendering="geometricPrecision" textRendering="geometricPrecision"><ellipse rx="239.999999" ry="239.999999" transform="translate(320 239.999999)" fill={fill} strokeWidth="0"/><line x1="0" y1="-100.45977" x2="0" y2="100.45977" transform="matrix(0 1-1 0 320 240)" fill="none" stroke={stroke} strokeWidth="10"/><line x1="0" y1="-100.45977" x2="0" y2="100.45977" transform="translate(320 239.999999)" fill="none" stroke={stroke} strokeWidth="10"/></SvgTest>
               
        </>
    );
};

export default Home;