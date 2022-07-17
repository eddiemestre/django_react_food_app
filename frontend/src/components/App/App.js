import './App.css';
import React, { useContext, useState, useEffect } from "react"

import AnimatedRoutes from '../Routes/AnimatedRoutes';
import PublicRoutes from '../Routes/PublicRoutes';
import NotFoundRoute from '../Routes/NotFoundRoute';
import { AuthenticatedProvider } from '../../context/AuthContext';

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
    const loggedInUser = localStorage.getItem("refresh")

   
  
    if (loggedInUser) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
     
    }

    // console.log("logged in true?", isLoggedIn);
  }, [])


  return (
      <>

            <PublicRoutes />
            <AnimatedRoutes />
        {/* <NotFoundRoute /> */}
      </>


  );
}

export default App;
