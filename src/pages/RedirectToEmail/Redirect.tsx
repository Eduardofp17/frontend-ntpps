import React from 'react';
import { Main, Container } from './styled';
import ContainedButton from '../../components/buttons/contained';
import Erro404 from '../Erro 404/404';
import { useSelector } from 'react-redux';
import { States } from '../../store/globalTypes';
function RedirectToEmail(): JSX.Element {
  const registered: boolean = useSelector(
    (state: States): boolean => state.registerReducer.registered,
  );
  return (
    <React.Fragment>
      {registered ? (
        <Main>
          <Container>
            <h2>Enviamos um link no seu email.</h2>
            <h3>Clicando nele você poderá confirmar que seu email é válido</h3>
            <ContainedButton textButton="Início" to="/" />
          </Container>
        </Main>
      ) : (
        <Erro404 />
      )}
    </React.Fragment>
  );
}

export default RedirectToEmail;
