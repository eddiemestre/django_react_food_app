import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom"
import Home from '../../pages/Home/Home';
import ViewReview from '../ViewReview';
import PersistLogin from '../PersistLogin/PersistLogin';
import RequireAuth from "../RequireAuth/index.js";
import InAppHeader from "../InAppHeader";
import { Outlet } from "react-router-dom";
import InAppTemplate from "./InAppTemplate";

const AnimatedRoutes = () => {

    return (
        // <>
        // <InAppHeader/>
        // <Routes >
        //     <Route element={<PersistLogin />}>
        //         <Route element={<RequireAuth />}>
        //             <Route exact path="/profile/:email" element={<Home />}/>
        //             <Route path="/test" exact element={<ViewReview />} />
        //         </Route>
        //     </Route>
        // </Routes>
        // </>
        // // <>
        // //     <InAppHeader />
        // //     <Outlet />
            
        // // </>

        <Routes>
        <Route path="" element={<InAppTemplate />}>
            <Route element={<PersistLogin />}>
                <Route element={<RequireAuth />}>
                    <Route exact path="/profile/:email" element={<Home />}/>
                    <Route path="/test" exact element={<ViewReview />} />
                </Route>
            </Route>
        </Route>
      </Routes>
    );
};

export default AnimatedRoutes;