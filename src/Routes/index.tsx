import React from 'react';

import { Routes, Route } from 'react-router-dom';
import { States } from '../store/globalTypes';
import { useSelector } from 'react-redux';
//Pages bellow
import Loggeding from './logedding';
import Erro404 from '../pages/Erro 404/404';
import Home from '../pages/Home/home';
import Login from '../pages/Login/login';
import Forgot from '../pages/ForgotPassword/Forgot';
import Register from '../pages/Register/Register';
import ConfirmEmail from '../pages/ConfirmEmail/Confirm';
import Cardapios from '../pages/Cardapios';
import Tools from '../pages/Tools/tools';
import AdmCardapios from '../pages/AdmCardapios/AdmCardapios';
import CriarCardapios from '../pages/CriarCardapios';

function Rotas(): JSX.Element {
  const loggedin = useSelector(
    (state: States): boolean => state.authReducer.loggedIn,
  );
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<Forgot />} />
        <Route path="/createAccount" element={<Register />} />
        <Route path="/createAccount/confirmEmail" element={<ConfirmEmail />} />
        <Route path="/cardapios" element={<Cardapios />} />
        <Route
          path="/tools"
          element={
            <Loggeding loggedin={loggedin}>
              <Tools />
            </Loggeding>
          }
        />
        <Route
          path="/tools/AdmCardapios"
          element={
            <Loggeding loggedin={loggedin}>
              <AdmCardapios />
            </Loggeding>
          }
        />
        <Route
          path="/tools/AdmCardapios/CriarCardapios"
          element={
            <Loggeding loggedin={loggedin}>
              <CriarCardapios />
            </Loggeding>
          }
        />
        <Route path="*" element={<Erro404 />} />
      </Routes>
    </React.Fragment>
  );
}
export default Rotas;
