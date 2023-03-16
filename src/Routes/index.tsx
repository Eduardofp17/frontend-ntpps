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
import Cardapios from '../pages/CadapiosPages/Cardapios';
import Tools from '../pages/Tools/tools';
import AdmCardapios from '../pages/AdmCardapios/AdmCardapios';
import CriarCardapios from '../pages/CadapiosPages/CriarCardapios';
import AtualizarCardapios from '../pages/CadapiosPages/AtualizarCardapios';
import ParaGestores from '../pages/ParaGestores/ParaGestores';
import PedidosDeAdesao from '../pages/ParaGestoresPages/PedidosDeAdesao';

function Rotas(): JSX.Element {
  const loggedin = useSelector(
    (state: States): boolean => state.authReducer.loggedIn,
  );
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<Forgot />} />
        <Route path="/createaccount" element={<Register />} />
        <Route path="/createcccount/confirmemail" element={<ConfirmEmail />} />
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
          path="/tools/adm-cardapios"
          element={
            <Loggeding loggedin={loggedin}>
              <AdmCardapios />
            </Loggeding>
          }
        />
        <Route
          path="/tools/adm-cardapios/criar-cardapios"
          element={
            <Loggeding loggedin={loggedin}>
              <CriarCardapios />
            </Loggeding>
          }
        />
        <Route
          path="/tools/adm-cardapios/atualizar-cardapios"
          element={
            <Loggeding loggedin={loggedin}>
              <AtualizarCardapios />
            </Loggeding>
          }
        />
        <Route
          path="/tools/gestores"
          element={
            <Loggeding loggedin={loggedin}>
              <ParaGestores />
            </Loggeding>
          }
        />
        <Route
          path="/tools/gestores/pedidos-de-adesao"
          element={
            <Loggeding loggedin={loggedin}>
              <PedidosDeAdesao />
            </Loggeding>
          }
        />
        <Route path="*" element={<Erro404 />} />
      </Routes>
    </React.Fragment>
  );
}
export default Rotas;
