import './App.css';
import React, { useContext, useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import RequireAuth from "../RequireAuth/index.js";
import PersistLogin from '../PersistLogin/PersistLogin';

import Layout from '../Layout/index';
import Home from '../../pages/Home/Home';
import Login from '../../pages/Login/Login';
import SignUp from '../../pages/SignUp/SignUp';
import InAppHeader from '../InAppHeader';
import ViewReview from '../ViewReview';
import AnimatedRoutes from '../Routes/AnimatedRoutes';
import PublicRoutes from '../Routes/PublicRoutes';

import { useTransition, animated } from '@react-spring/web';

function App() {
    // const { auth } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // useEffect(() => {
  //   if (auth) {
  //     setIsLoggedIn(true)
  //   } else {
  //     setIsLoggedIn(false)
  //   }

  //   console.log("is logged in:", isLoggedIn)
  // }, [auth, isLoggedIn])


  useEffect(() => {
    const loggedInUser = localStorage.getItem("user")

   
  
    if (loggedInUser) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
     
    }

    console.log("logged in true?", isLoggedIn);
  }, [])

  // const location = useLocation();
  // console.log("location", location.pathname);
  // const transitions = useTransition(location.pathname, {
  //   from: {opacity: 0, transform: "translate(100%, 0)"},
  //   enter: {opacity: 1, transform: "translate(0%, 0)"},
  //   leave: {opacity: 0, transform: "translate(-50%, 0)"}
  // })

  // console.log("transitions", transitions);

  return (
      <>
        {/* <Routes>
          <Route path="/" element={<Layout />}> */}
            {/* public routes */}
            {/* <Route element={<PersistLogin />}>
              <Route path="/login" element={<Login />} />
            </Route>
            <Route path="/register" element={<SignUp />}/> */}

            {/* private routes */}
            {/* <Route element={<PersistLogin />}>
              <Route element={<RequireAuth />}> */}
                {/* <Route exact path="/profile/:email" element={<Home />}/>
                <Route path="/test" exact element={<ViewReview />} /> */}
                {/* <Route />
                  <AnimatedRoutes />
                </Route>
            </Route> */}
            
            {/* catch all, 404 */}
            {/* <Route path="*" element={<Missing />} /> */}
          {/* </Route>
        </Routes> */}
{/*         

 {fadeAnimationTwo((style, item) =>
            item ? <FaderDivClose style={style}/> : '' )}

        <PublicRoutes />
        <AnimatedRoutes /> */}
        {/* {transitions((styles, item) =>
              <animated.div style={styles}>
              
              <Routes location={item}>
                  <Route exact path="/" element={<PublicRoutes />} >
                    <Route element={<PersistLogin />} >
                      <Route exact path="/login" element={<Login />} />
                    </Route>
                    <Route exact path="/register" element={<SignUp />}/>
                  </Route>
                </Routes>
              </animated.div>
            )} */}
        <PublicRoutes />
        <AnimatedRoutes />

        {/* <Routes> */}
            {/* <Route path="/" element={<PublicRoutes />}>
                <Route element={<PersistLogin />}>
                  <Route path="/login" element={<Login />} />
                </Route>
                <Route path="/register" element={<SignUp />}/>
            </Route> */}

            {/* <Route path="/profile" element={<AnimatedRoutes />}>
                <Route element={<PersistLogin />}>
                  <Route element={<RequireAuth />}>
                    <Route exact path="/profile/:email" element={<Home />}/>
                    <Route path="/profile/test" exact element={<ViewReview />} />
                  </Route>
                </Route>
            </Route>

        </Routes> */}
        </>


  );
}

export default App;
