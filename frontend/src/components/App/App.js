import './App.css';
import React, {  } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from '../../pages/Home/Home';
import Login from '../../pages/Login/Login';
import SignUp from '../../pages/SignUp/SignUp';


function App() {
  return (
    
    <Router>
        <Routes>
          <Route path="/home" element={<Home />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />}/>
        </Routes>
    </Router>

  );
}

export default App;



// TO DO
// Separate these functions into pages - DONE
// Design Tablet/Desktop notification alert - DONE
// Design login page core
// design register page core