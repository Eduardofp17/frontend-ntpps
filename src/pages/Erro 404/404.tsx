import './404.css';
import React from 'react';
import { CssBaseline } from '@mui/material';
import { Main } from './styled';
import ContainedButton from '../../components/buttons/contained';
function Erro404(): JSX.Element {
  return (
    <React.Fragment>
      <CssBaseline />
      <Main>
        <h1> Page not Found</h1>
        <h3> 404 Error</h3>

        <ContainedButton textButton="Página Inicial" to="/" />
      </Main>
    </React.Fragment>
  );
}

export default Erro404;
