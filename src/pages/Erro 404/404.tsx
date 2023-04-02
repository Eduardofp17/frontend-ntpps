import React from 'react';
import { CssBaseline } from '@mui/material';
import { Main } from './styled';
import ContainedButton from '../../components/buttons/contained';
function Erro404(): JSX.Element {
  document.title = 'Erro 404';
  return (
    <React.Fragment>
      <CssBaseline />
      <Main>
        <h1> Página não encontrada</h1>
        <h3> Erro 404</h3>

        <ContainedButton textButton="Página Inicial" to="/" />
        <ContainedButton textButton="Fazer Login" to="/login" />
      </Main>
    </React.Fragment>
  );
}

export default Erro404;
