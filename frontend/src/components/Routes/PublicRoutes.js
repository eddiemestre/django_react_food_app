import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom"
import PersistLogin from '../PersistLogin/PersistLogin';
import Login from '../../pages/Login/Login';
import SignUp from '../../pages/SignUp/SignUp';
import PublicTemplate from "./PublicRouteTemplate";

const PublicRoutes = () => {
  const [successfulSignUp, setSuccessfulSignUp] = useState(false);
  // const [successfulSignUp, setSuccessfulSignUp] = useState(true);


    return (

      
      <Routes>
        <Route path="" element={<PublicTemplate />}>
            <Route exact path="/login" element={<Login signUpSuccess={successfulSignUp}/>}/>
            <Route path="/register" exact element={<SignUp setSignUp={setSuccessfulSignUp} />} />
        </Route>
      </Routes>
    );
  };

export default PublicRoutes;