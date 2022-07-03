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
import SingleReviewView from "../../pages/SingleReviewView.js";
import ReviewRoutes from "../ReviewStager";

const AnimatedRoutes = () => {

    return (
        <Routes>
        <Route path="" element={<InAppTemplate />}>
            <Route element={<PersistLogin />}>
                {/* <Route element={<RequireAuth />}> */}
                <Route element={<ReviewRoutes />}>
                    <Route element={<ReviewAdderTemplate />}>
                        <Route exact path="/profile/:email" element={<Home />}/>
                        <Route exact path="/create_review" element={<CreateReview />}/>
                    </Route>
                    <Route element={<ReviewViewTemplate />} >
                        <Route exact path="/profile/:email/:id" element={<SingleReviewView />} />
                    </Route>
                {/* </Route> */}
                </Route>
            </Route>
        </Route>
      </Routes>
    );
};

export default AnimatedRoutes;