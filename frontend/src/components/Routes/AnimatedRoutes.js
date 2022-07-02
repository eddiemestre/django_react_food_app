import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom"
import Home from '../../pages/Home/Home';
import ViewReview from '../ViewReview';
import PersistLogin from '../PersistLogin/PersistLogin';
import RequireAuth from "../RequireAuth/index.js";
import InAppTemplate from "./InAppTemplate";

const AnimatedRoutes = () => {

    return (
        <Routes>
        <Route path="" element={<InAppTemplate />}>
            <Route element={<PersistLogin />}>
                {/* <Route element={<RequireAuth />}> */}
                    <Route exact path="/profile/:email" element={<Home />}/>
                {/* </Route> */}
            </Route>
        </Route>
      </Routes>
    );
};

export default AnimatedRoutes;