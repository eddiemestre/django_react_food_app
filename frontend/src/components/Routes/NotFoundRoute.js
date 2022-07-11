import React, { useState } from "react";
import { Route, Routes } from "react-router-dom"
import NotFound from "../../pages/NotFound";

const NotFoundRoute = () => {

    return (
        <Routes>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default NotFoundRoute;