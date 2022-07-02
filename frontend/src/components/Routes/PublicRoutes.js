import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom"
import PersistLogin from '../PersistLogin/PersistLogin';
import { Outlet } from "react-router-dom";
import Layout from '../Layout/index';
import Login from '../../pages/Login/Login';
import SignUp from '../../pages/SignUp/SignUp';
import Header from '../Header/index';
import Footer from "../Footer/index";
import { useTransition, animated, config } from '@react-spring/web';
import { Container, NoticeContainer, NoticeText } from './Styles';
import PublicTemplate from "./PublicRouteTemplate";
import {AnimatePresence} from "framer-motion";  
const PublicRoutes = () => {
  const [successfulSignUp, setSuccessfulSignUp] = useState(false);
  // const [successfulSignUp, setSuccessfulSignUp] = useState(true);
  const [isTrue, setIsTrue] = useState(true);
  const delay = ms => new Promise(res => setTimeout(res, ms));

    const location = useLocation();
    // console.log("location", location.pathname);

    const transitions = useTransition(location.pathname, {
      from: {opacity: 0, transform: "translate(100%, 0)"},
      enter: {opacity: 1, transform: "translate(0%, 0)"},
      leave: {opacity: 0, transform: "translate(-50%, 0)"}
    })
  
    // console.log(transitions)

  //   const PauseAnimation = async () => {
  //     await delay(5000);
  //     setSuccessfulSignUp(false)
  //   }
  //   const successAppear = useTransition(successfulSignUp, {
  //     from: { opacity: 0, transform: "translateY(-20px)" },
  //     enter: { opacity: 1, transform: "translateY(0px)" },
  //     leave: { opacity: 0, transform: "translateY(-20px)" },
  //     reverse: successfulSignUp,
  //     delay: 500,
  //     onRest: () => PauseAnimation(),
  // });

    return (

      
      <Routes>
        <Route path="" element={<PublicTemplate />}>
            <Route element={<PersistLogin />}>
              <Route exact path="/login" element={<Login signUpSuccess={successfulSignUp}/>}/>
            </Route>
            <Route path="/register" exact element={<SignUp setSignUp={setSuccessfulSignUp} />} />
        </Route>
      </Routes>
    );
  };
        // <>
        // <Header/>
        // <Routes>
        //   {/* <Route path="/" element={<Layout />}> */}
        //     {/* public routes */}
        //     <Route element={<PersistLogin />}>
        //       <Route path="/login" element={<Login />} />
        //     </Route>
        //     <Route path="/register" element={<SignUp />}/>
        //     {/* <Route path="*" element={<Missing />} /> */}
        //   {/* </Route> */}
        // </Routes>
        // </>
        // <>
            {/* <Header /> */}
            {/* <Outlet /> */}
{/* 

          {successAppear((style, item) =>
            item ? 
            <NoticeContainer style={style}>
                <NoticeText>Account created successfully!</NoticeText>
            </NoticeContainer>
            : ''
            )} */}
            {/* <AnimatePresence exitBeforeEnter>
              <Routes location={location} key={location.pathname}>
                <Route path="" element={<PublicTemplate />}>
                  <Route element={<PersistLogin />} >
                    <Route exact path="/login" element={<Login signUpSuccess={successfulSignUp} />} />
                  </Route>
                  <Route exact path="/register" element={<SignUp setSignUp={setSuccessfulSignUp} />}/>
                </Route>
              </Routes>
            </AnimatePresence> */}
            {/* {transitions((styles, item) =>
              <animated.div style={styles}>
              
              <Routes location={item}> */}
                      {/* <Route element={<PersistLogin />} > */}
                      {/* <Route exact path="/login" element={<Login signUpSuccess={successfulSignUp} />} /> */}
                      {/* </Route> */}
                      {/* <Route exact path="/register" element={<SignUp setSignUp={setSuccessfulSignUp} />}/> */}
                  
                    
                      

                    
                    
                    
                {/* </Routes>
              </animated.div>
            )} */}
            
            {/* <Footer /> */}
        {/* </> */}


export default PublicRoutes;