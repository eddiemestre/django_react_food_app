import './App.css';
import React, {  } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RequireAuth from "../RequireAuth/index.js";
import PersistLogin from '../PersistLogin/PersistLogin';

import Layout from '../Layout/index';
import Home from '../../pages/Home/Home';
import Login from '../../pages/Login/Login';
import SignUp from '../../pages/SignUp/SignUp';
import InAppHeader from '../InAppHeader';
import ViewReview from '../ViewReview';

function App() {
  return (
    
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* public routes */}
            <Route element={<PersistLogin />}>
              <Route path="/login" element={<Login />} />
            </Route>
            <Route path="/register" element={<SignUp />}/>

            {/* private routes */}
            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth />}>
                <Route exact path="/profile/:email" element={<Home />}/>
                <Route path="/test" exact element={<ViewReview />} />
                </Route>
            </Route>
            
            {/* catch all, 404 */}
            {/* <Route path="*" element={<Missing />} /> */}
          </Route>
        </Routes>

  );
}

export default App;
