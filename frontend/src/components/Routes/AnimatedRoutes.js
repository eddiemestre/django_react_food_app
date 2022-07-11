import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom"
import Home from '../../pages/Home/Home';
import ViewReview from '../ViewReview';
import PersistLogin from '../PersistLogin/PersistLogin';
import RequireAuth from "../RequireAuth/index.js";
import InAppTemplate from "./InAppTemplate";
import CreateReview from "../../pages/CreateReview";
import ReviewAdderTemplate from "./PersistentReviewAdder";
import ReviewViewTemplate from "./ViewReviewTemplate";
import SingleReviewView from "../../pages/SingleReviewView";
import ReviewRoutes from "../ReviewStager";
import EditReview from "../../pages/EditReview";
import Settings from "../../pages/Settings";
import UpdatePassword from "../../pages/UpdatePassword";
import SettingsTemplate from "./SettingsRoute";

const AnimatedRoutes = () => {

    return (
        <Routes>
        <Route path="" element={<InAppTemplate />}>
            <Route element={<PersistLogin />}>
                {/* <Route element={<RequireAuth />}> */}
                <Route element={<ReviewRoutes />}>
                    <Route element={<ReviewAdderTemplate />}>
                        <Route exact path="/user/:username" element={<Home />}/>
                        <Route exact path="/create_review" element={<CreateReview />}/>
                    </Route>
                    <Route element={<ReviewViewTemplate />} >
                        <Route exact path="/user/:username/:id" element={<SingleReviewView />} />
                        <Route exact path="/user/:username/:id/edit" element={<EditReview />} />
                    </Route>
                {/* </Route> */}
                </Route>
                <Route element={<SettingsTemplate />}>
                    <Route exact path="/settings" element={<Settings />} />
                    <Route exact path="/update-password" element={<UpdatePassword />} />
                </Route>
            </Route>
        </Route>
        
      </Routes>
    );
};

export default AnimatedRoutes;