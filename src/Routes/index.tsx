import React from 'react';

import { Routes, Route } from 'react-router-dom';
import { GetAuthState } from '../store/modules/auth/types';
import { useSelector } from 'react-redux';
//Pages bellow
import Home from '../pages/Home/home';
import Erro404 from '../pages/Erro 404/404';
import Login from '../pages/Login/login';
import Forgot from '../pages/ForgotPassword/Forgot';
import Register from '../pages/Register/Register';
import Loggeding from './logedding';
function Rotas(): JSX.Element {
  const loggedin = useSelector(
    (state: GetAuthState): boolean => state.authReducer.loggedIn,
  );
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <Loggeding loggedin={loggedin}>
              <Login />
            </Loggeding>
          }
        />
        <Route path="/forgotPassword" element={<Forgot />} />
        <Route path="/createAccount" element={<Register />} />
        <Route path="*" element={<Erro404 />} />
      </Routes>
    </React.Fragment>
  );
}
export default Rotas;
