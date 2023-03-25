import React, { useState, useEffect } from 'react';
import { Container, IMG, Main, P } from '../RedirectToEmail/styled';
import DenseHeader from '../../components/headers/dense';
import Form from '../../components/forgotPassword/form';
import { useSelector } from 'react-redux';
import { States } from '../../store/globalTypes';
import { CircularProgress } from '@mui/material';
import { darkGreen } from '../../config/collors/colors';
function Forgot(): JSX.Element {
  const loadingState = useSelector(
    (state: States): boolean => state.authReducer.loading,
  );
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(loadingState);
  }, [loadingState]);

  return (
    <React.Fragment>
      <DenseHeader text="Esqueci minha senha" />
      <Main style={{ display: loading ? 'flex' : 'none' }}>
        <CircularProgress
          style={{ color: darkGreen, margin: 'auto', marginTop: '200px' }}
        />
      </Main>
      <Main style={{ display: loading ? 'none' : 'flex' }}>
        <Container>
          <IMG
            src="/images/propaganda.png"
            alt="Propaganda alusiva ao desperdício de Alimentos"
          />
          <P>Insira seu email para redefinir a sua senha:</P>
          <Form />
        </Container>
      </Main>
    </React.Fragment>
  );
}

export default Forgot;
