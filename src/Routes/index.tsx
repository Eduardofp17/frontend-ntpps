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
import CardapioFeedback from '../pages/CadapiosPages/CardapioFeedback/index';
import AdministrarSalas from '../pages/FrequenciaPages/AdministrarSalas';
import HistoricoFrequencia from '../pages/FrequenciaPages/HistoricoFrequencia';
import ManageUsers from '../pages/ParaGestoresPages/ManageUsers';
import ManageStudents from '../pages/FrequenciaPages/ManageStudents';
import UpdateFrequency from '../pages/FrequenciaPages/UpdateFrequency';

function Rotas(): JSX.Element {
  const loggedin = useSelector(
    (state: States): boolean => state.authReducer.loggedIn,
  );
  return (
    <React.Fragment>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Login />
            </>
          }
        />
        <Route
          path="/forgotpassword"
          element={
            <>
              <Forgot />{' '}
            </>
          }
        />
        <Route
          path="/forgotpassword/redefine-password/:v1?"
          element={
            <>
              <RedefinePassword />{' '}
            </>
          }
        />
        <Route
          path="/createaccount"
          element={
            <>
              <Register />{' '}
            </>
          }
        />
        <Route
          path="/createaccount/confirmemail"
          element={
            <>
              <RedirectToEmail />
            </>
          }
        />
        <Route
          path="/createaccount/confirmemail/:v1?"
          element={
            <>
              <ConfirmEmail />
            </>
          }
        />
        <Route
          path="/createaccount/confirmemail-school/:v1?"
          element={
            <>
              <ConfirmEmailSchool />{' '}
            </>
          }
        />
        <Route
          path="/cardapios"
          element={
            <>
              <Cardapios />
            </>
          }
        />
        {/* <Route
          path="/cardapios/feedback-cardapios"
          element={<CardapioFeedback />}
        /> */}
        <Route
          path="/tools"
          element={
            <Loggeding levelRequired={0} loggedin={loggedin}>
              <Tools />
            </Loggeding>
          }
        />
        <Route
          path="/tools/adm-cardapios"
          element={
            <Loggeding levelRequired={1} loggedin={loggedin}>
              <AdmCardapios />
            </Loggeding>
          }
        />
        <Route
          path="/tools/adm-cardapios/criar-cardapios"
          element={
            <Loggeding levelRequired={1} loggedin={loggedin}>
              <CriarCardapios />
            </Loggeding>
          }
        />
        <Route
          path="/tools/adm-cardapios/atualizar-cardapios"
          element={
            <Loggeding levelRequired={1} loggedin={loggedin}>
              <AtualizarCardapios />
            </Loggeding>
          }
        />
        <Route
          path="/tools/gestores"
          element={
            <Loggeding levelRequired={1} loggedin={loggedin}>
              <ParaGestores />
            </Loggeding>
          }
        />
        <Route
          path="/tools/gestores/pedidos-de-adesao"
          element={
            <Loggeding levelRequired={1} loggedin={loggedin}>
              <PedidosDeAdesao />
            </Loggeding>
          }
        />
        <Route
          path="/tools/gestores/administrar-usuarios"
          element={
            <Loggeding levelRequired={3} loggedin={loggedin}>
              <ManageUsers />
            </Loggeding>
          }
        />
        <Route
          path="/tools/frequencia"
          element={
            <Loggeding loggedin={loggedin} levelRequired={1}>
              <Frequencia />
            </Loggeding>
          }
        />
        <Route
          path="/tools/frequencia/atualizar-frequencia"
          element={
            <Loggeding levelRequired={1} loggedin={loggedin} equals={true}>
              <UpdateFrequency />
            </Loggeding>
          }
        />
        <Route
          path="/tools/frequencia/administrar-salas"
          element={
            <Loggeding levelRequired={1} loggedin={loggedin}>
              <AdministrarSalas />
            </Loggeding>
          }
        />
        <Route
          path="/tools/frequencia/historico-de-frequencias"
          element={
            <Loggeding levelRequired={2} loggedin={loggedin}>
              <HistoricoFrequencia />
            </Loggeding>
          }
        />
        <Route
          path="/tools/frequencia/administrar-alunos-de-sua-sala"
          element={
            <Loggeding levelRequired={1} loggedin={loggedin} equals={true}>
              <ManageStudents />
            </Loggeding>
          }
        />
        <Route path="*" element={<Erro404 />} />
      </Routes>
    </React.Fragment>
  );
}
export default Rotas;
