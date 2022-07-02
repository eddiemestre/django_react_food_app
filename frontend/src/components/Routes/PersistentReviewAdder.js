import { Outlet, useNavigate } from "react-router-dom";
import {SvgTest, FaderDivClose, ModalContainer} from './Styles';
import { useEffect, useState } from 'react';
import { useTransition, animated } from '@react-spring/web';
import DiscardModal from "../DiscardModal";

const ReviewAdderTemplate = () => {
    const [fill, setFill] = useState('#03dac6')
    const [stroke, setStroke] = useState('black')
    const [reviewModuleActive, setReviewModuleActive] = useState(false)
    const [discardModal, setDiscardModal] = useState(false)
    const [inputHasChanged, setInputHasChanged] = useState(false)
    const [reviewSaved, setReviewSaved] = useState(false)


    const navigate = useNavigate();

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


    const clickYes = () => {
        toggleReviewOff()
        setDiscardModal(false)
        setReviewModuleActive(false)
        setInputHasChanged(false)
        navigate(`/profile/${JSON.parse(localStorage.getItem('email'))}`)
    }

    const clickNo = () => {
        setDiscardModal(false)
    }


    const ModalConditions = () => {

        if (reviewModuleActive === false) {
            console.log("review modal false, changing to true")
            toggleReviewOn()
            setReviewModuleActive(true)
            navigate('/create_review');
            
        } else {
            if (inputHasChanged === false) {
                console.log("reivew modal true, changing to false. No changes detected")
                toggleReviewOff()
                setReviewModuleActive(false)
                navigate(`/profile/${JSON.parse(localStorage.getItem('email'))}`)
                
            } else {
                console.log("Discard Modal false, changing to True")
                setDiscardModal(true)
            }
        }
    }

  return (
    <div> 
      <Outlet context={[toggleReviewOff, setReviewSaved, reviewModuleActive, setReviewModuleActive, setInputHasChanged ]}/>
      {/* <SvgTest isActive={reviewModuleActive} onClick={() => {ModalConditions()}} id="efXkrK1xpLH1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 640 480" shapeRendering="geometricPrecision" textRendering="geometricPrecision"><ellipse rx="239.999999" ry="239.999999" transform="translate(320 239.999999)" fill={fill} strokeWidth="0"/><line x1="0" y1="-100.45977" x2="0" y2="100.45977" transform="matrix(0 1-1 0 320 240)" fill="none" stroke={stroke} strokeWidth="10"/><line x1="0" y1="-100.45977" x2="0" y2="100.45977" transform="translate(320 239.999999)" fill="none" stroke={stroke} strokeWidth="10"/></SvgTest> */}
      <SvgTest isActive={reviewModuleActive} onClick={() => {ModalConditions()}} id="efXkrK1xpLH1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 640 480" shapeRendering="geometricPrecision" textRendering="geometricPrecision"><ellipse rx="239.999999" ry="239.999999" transform="translate(320 239.999999)" fill={fill} strokeWidth="0"/><line x1="0" y1="-100.45977" x2="0" y2="100.45977" transform="matrix(0 1-1 0 320 240)" fill="none" stroke={stroke} strokeWidth="10"/><line x1="0" y1="-100.45977" x2="0" y2="100.45977" transform="translate(320 239.999999)" fill="none" stroke={stroke} strokeWidth="10"/></SvgTest>
      {fadeAnimationTwo((style, item) =>
            item ? <FaderDivClose style={style}/> : '' )}
            {discardModal && (modalAppear((style, item) => item ? <ModalContainer style={style}><DiscardModal clickYes={clickYes} clickNo={clickNo}/></ModalContainer> : ''))}
           
    </div>
  )
  }

  export default ReviewAdderTemplate;