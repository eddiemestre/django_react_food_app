import './App.css';
import React from "react"
import { Routes, Route } from 'react-router-dom';

import { RegistrationProvider } from '../../context/RegistrationContext';
import { AuthProvider } from '../../context/AuthProvider';

import PublicTemplate from '../Routes/PublicRouteTemplate';
import InAppTemplate from '../Routes/InAppTemplate';

import Login from '../../pages/Login/Login';
import SignUp from '../../pages/SignUp/SignUp';
import Home from '../../pages/Home/Home';
import SingleReviewView from '../../pages/SingleReviewView';
import CreateReview from '../../pages/CreateReview';
import EditReview from '../../pages/EditReview';
import Settings from '../../pages/Settings';
import UpdatePassword from '../../pages/UpdatePassword';

import useWindowSize from '../../hooks/useWindowSize';
import LargeScreenView from '../LargeScreenView';
import { DataProvider } from '../../context/DataContext';

import ReviewAdderTemplate from '../Routes/PersistentReviewAdder';

import PersistLogin from '../PersistLogin/PersistLogin';
import { RequireAuthCreate, RequireAuthEdit, RequireAuthSettings } from '../RequireAuth';

// import AnimatedRoutes from '../Routes/AnimatedRoutes';
// import PublicRoutes from '../Routes/PublicRoutes';
// import NotFoundRoute from '../Routes/NotFoundRoute';
// import { AuthenticatedProvider } from '../../context/AuthContext';


function App() {
  const { width } = useWindowSize();

  return (
      <AuthProvider>
        { width < 601 ?
          <>
          <DataProvider>
            <RegistrationProvider>
              <Routes>
                <Route element={<PublicTemplate />}>
                  <Route exact path="/login" element={<Login />} />
                  <Route exact path="/register" element={<SignUp />} />
                </Route>
              </Routes>
            </RegistrationProvider>

            
              <Routes>
                <Route element={<PersistLogin />}>
                  <Route element={<InAppTemplate />}>
                    <Route element={<ReviewAdderTemplate />}>
                      <Route path="/user/:username" element={<Home />} />
                      <Route element={<RequireAuthCreate />}>
                        <Route path="/create-review" element={<CreateReview />} />
                      </Route>
                    </Route>
                    <Route path="/user/:username/:id" element={<SingleReviewView />} />
                    <Route element={<RequireAuthEdit />}>
                      <Route path="/user/:username/:id/edit" element={<EditReview/>} />
                    </Route>
                    <Route element={<RequireAuthSettings />}>
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/update-password" element={<UpdatePassword />} />
                    </Route>
                  </Route>
                </Route>
              </Routes>
            </DataProvider>
          </>
          : <LargeScreenView />}
      </AuthProvider>

      /* <PublicRoutes /> */
      /* <AnimatedRoutes /> */
      /* <NotFoundRoute /> */


  );
}

export default App;
