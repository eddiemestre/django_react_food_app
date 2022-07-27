import './App.css';
import React from "react"
import { Routes, Route } from 'react-router-dom';

// hooks
import { RegistrationProvider } from '../../context/RegistrationContext';
import { AuthProvider } from '../../context/AuthProvider';
import { DataProvider } from '../../context/DataContext';
import PersistLogin from '../PersistLogin/PersistLogin';
import { RequireAuthCreate, RequireAuthEdit, RequireAuthSettings } from '../RequireAuth';

import useWindowSize from '../../hooks/useWindowSize';
import LargeScreenView from '../LargeScreenView';

// templates
import PublicTemplate from '../Routes/PublicRouteTemplate';
import InAppTemplate from '../Routes/InAppTemplate';
import ReviewAdderTemplate from '../Routes/PersistentReviewAdder';

// pages
import Home from '../../pages/Home';
import Login from '../../pages/Login/Login';
import SignUp from '../../pages/SignUp/SignUp';
import Feed from '../../pages/Feed';
import SingleReviewView from '../../pages/SingleReviewView';
import CreateReview from '../../pages/CreateReview';
import EditReview from '../../pages/EditReview';
import Settings from '../../pages/Settings';
import UpdatePassword from '../../pages/UpdatePassword';
import NotFound from '../../pages/NotFound';



function App() {
  const { width } = useWindowSize();

  return (
      <AuthProvider>
        <DataProvider>
          <RegistrationProvider>

          { width < 601 || width == undefined ?
            <>
              <Routes>
                <Route element={<PublicTemplate />}>
                  <Route path="/" element={<Home />} />
                  <Route exact path="/login" element={<Login />} />
                  <Route exact path="/register" element={<SignUp />} />
                </Route>

                <Route element={<PersistLogin />}>
                  <Route element={<InAppTemplate />}>
                    <Route element={<ReviewAdderTemplate />}>
                      <Route path="/user/:username" element={<Feed />} />
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

                <Route element={<InAppTemplate />}>
                  <Route exact path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </>
          : <LargeScreenView />}
          </RegistrationProvider>
        </DataProvider>
      </AuthProvider>
  );
}

export default App;
