import './App.css';
import React, {  } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RequireAuth from "../RequireAuth/index.js";

import Layout from '../Layout/index';
import Home from '../../pages/Home/Home';
import Login from '../../pages/Login/Login';
import SignUp from '../../pages/SignUp/SignUp';


function App() {
  return (
    
        <Routes>
        <Route path="/" element={<Layout />}>
            {/* public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignUp />}/>

            {/* private routes */}
            <Route element={<RequireAuth />}>
              <Route path="/home" element={<Home />}/>
            </Route>
            
            {/* catch all, 404 */}
            {/* <Route path="*" element={<Missing />} /> */}
          </Route>
        </Routes>

  );
}

export default App;
