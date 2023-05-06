import React from 'react';
import { CssBaseline } from '@mui/material';
import { Main } from './styled';
import ContainedButton from '../../components/buttons/contained';

function Erro401(): JSX.Element {
  document.title = 'Erro 401';
  return (
    <React.Fragment>
      <CssBaseline />
      <Main>
        <h1> Você não tem a autorização necessária para acessar essa página</h1>
        <h3> Erro 401</h3>

        <ContainedButton textButton="Página Inicial" to="/" />
        <ContainedButton textButton="Fazer Login" to="/login" />
      </Main>
    </React.Fragment>
  );
}

export default Erro401;
