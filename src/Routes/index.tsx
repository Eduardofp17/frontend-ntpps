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
import RedirectToEmail from '../pages/RedirectToEmail/Redirect';
import Cardapios from '../pages/CadapiosPages/Cardapios';
import Tools from '../pages/Tools/tools';
import AdmCardapios from '../pages/AdmCardapios/AdmCardapios';
import CriarCardapios from '../pages/CadapiosPages/CriarCardapios';
import AtualizarCardapios from '../pages/CadapiosPages/AtualizarCardapios';
import ParaGestores from '../pages/ParaGestores/ParaGestores';
import PedidosDeAdesao from '../pages/ParaGestoresPages/PedidosDeAdesao';
import Frequencia from '../pages/FrequenciaPages/FrequenciaTools';
import AtualizarFrequencia from '../pages/FrequenciaPages/UpdateFrequencia';
import RedefinePassword from '../pages/RedefinePassword';
import ConfirmEmail from '../pages/ConfirmEmail/Confirm';
import ConfirmEmailSchool from '../pages/ConfirmEmail-School/Confirm';
import CardapioFeedback from '../pages/CadapiosPages/CardapioFeedback';
import AdministrarSalas from '../pages/FrequenciaPages/AdministrarSalas';

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
        <Route
          path="/forgotpassword/redefine-password/:v1?"
          element={<RedefinePassword />}
        />
        <Route path="/createaccount" element={<Register />} />
        <Route
          path="/createaccount/confirmemail"
          element={<RedirectToEmail />}
        />
        <Route
          path="/createaccount/confirmemail/:v1?"
          element={<ConfirmEmail />}
        />
        <Route
          path="/createaccount/confirmemail-school/:v1?"
          element={<ConfirmEmailSchool />}
        />
        <Route path="/cardapios" element={<Cardapios />} />
        {/* <Route
          path="/cardapios/feedback-cardapios"
          element={<CardapioFeedback />}
        /> */}
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
        <Route
          path="/tools/frequencia"
          element={
            <Loggeding loggedin={loggedin}>
              <Frequencia />
            </Loggeding>
          }
        />
        <Route
          path="/tools/frequencia/atualizar-frequencia"
          element={
            <Loggeding loggedin={loggedin}>
              <AtualizarFrequencia />
            </Loggeding>
          }
        />
        <Route
          path="/tools/frequencia/administrar-salas"
          element={
            <Loggeding loggedin={loggedin}>
              <AdministrarSalas />
            </Loggeding>
          }
        />
        <Route path="*" element={<Erro404 />} />
      </Routes>
    </React.Fragment>
  );
}
export default Rotas;
