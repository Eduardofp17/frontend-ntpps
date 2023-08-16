import React from 'react';

import { Routes, Route } from 'react-router-dom';
import { States } from '../store/globalTypes';
import { useSelector } from 'react-redux';
import Footer2 from '../components/footer2';
import Footer from '../components/footer';
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
import HistoricoFrequencia from '../pages/FrequenciaPages/HistoricoFrequencia';
import ManageUsers from '../pages/ParaGestoresPages/ManageUsers';

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
              <Home /> <Footer2 />{' '}
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Login /> <Footer />
            </>
          }
        />
        <Route
          path="/forgotpassword"
          element={
            <>
              <Forgot /> <Footer2 />{' '}
            </>
          }
        />
        <Route
          path="/forgotpassword/redefine-password/:v1?"
          element={
            <>
              <RedefinePassword /> <Footer2 />{' '}
            </>
          }
        />
        <Route
          path="/createaccount"
          element={
            <>
              <Register /> <Footer />{' '}
            </>
          }
        />
        <Route
          path="/createaccount/confirmemail"
          element={
            <>
              <RedirectToEmail /> <Footer2 />
            </>
          }
        />
        <Route
          path="/createaccount/confirmemail/:v1?"
          element={
            <>
              <ConfirmEmail /> <Footer2 />
            </>
          }
        />
        <Route
          path="/createaccount/confirmemail-school/:v1?"
          element={
            <>
              <ConfirmEmailSchool /> <Footer2 />{' '}
            </>
          }
        />
        <Route
          path="/cardapios"
          element={
            <>
              <Cardapios />
              <Footer />{' '}
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
            <Loggeding
              levelRequired={0}
              loggedin={loggedin}
              footer={<Footer2 />}
            >
              <Tools />
            </Loggeding>
          }
        />
        <Route
          path="/tools/adm-cardapios"
          element={
            <Loggeding
              levelRequired={1}
              loggedin={loggedin}
              footer={<Footer2 />}
            >
              <AdmCardapios />
            </Loggeding>
          }
        />
        <Route
          path="/tools/adm-cardapios/criar-cardapios"
          element={
            <Loggeding
              levelRequired={1}
              loggedin={loggedin}
              footer={<Footer2 />}
            >
              <CriarCardapios />
            </Loggeding>
          }
        />
        <Route
          path="/tools/adm-cardapios/atualizar-cardapios"
          element={
            <Loggeding
              levelRequired={1}
              loggedin={loggedin}
              footer={<Footer />}
            >
              <AtualizarCardapios />
            </Loggeding>
          }
        />
        <Route
          path="/tools/gestores"
          element={
            <Loggeding
              levelRequired={1}
              loggedin={loggedin}
              footer={<Footer2 />}
            >
              <ParaGestores />
            </Loggeding>
          }
        />
        <Route
          path="/tools/gestores/pedidos-de-adesao"
          element={
            <Loggeding
              levelRequired={1}
              loggedin={loggedin}
              footer={<Footer2 />}
            >
              <PedidosDeAdesao />
            </Loggeding>
          }
        />
        <Route
          path="/tools/gestores/administrar-usuarios"
          element={
            <Loggeding
              levelRequired={3}
              loggedin={loggedin}
              footer={<Footer />}
            >
              <ManageUsers />
            </Loggeding>
          }
        />
        <Route
          path="/tools/frequencia"
          element={
            <Loggeding
              loggedin={loggedin}
              levelRequired={2}
              footer={<Footer2 />}
            >
              <Frequencia />
            </Loggeding>
          }
        />
        <Route
          path="/tools/frequencia/atualizar-frequencia"
          element={
            <Loggeding
              levelRequired={1}
              loggedin={loggedin}
              footer={<Footer />}
            >
              <AtualizarFrequencia />
            </Loggeding>
          }
        />
        <Route
          path="/tools/frequencia/administrar-salas"
          element={
            <Loggeding
              levelRequired={1}
              loggedin={loggedin}
              footer={<Footer />}
            >
              <AdministrarSalas />
            </Loggeding>
          }
        />
        <Route
          path="/tools/frequencia/historico-de-frequencias"
          element={
            <Loggeding
              levelRequired={2}
              loggedin={loggedin}
              footer={<Footer />}
            >
              <HistoricoFrequencia />
            </Loggeding>
          }
        />
        <Route path="*" element={<Erro404 />} />
      </Routes>
    </React.Fragment>
  );
}
export default Rotas;
