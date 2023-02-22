import './Login.css';
import React, { useState, useEffect } from 'react';
import { Container, IMG, Main, P } from './styled';
import DenseHeader from '../../components/headers/dense';
import Form from '../../components/loginForm/form';
import { useSelector } from 'react-redux';
import { GetAuthState } from '../../store/modules/auth/types';
import { CircularProgress } from '@mui/material';
import { darkGreen } from '../../config/collors/colors';
function Login(): JSX.Element {
  const loadingState = useSelector(
    (state: GetAuthState): boolean => state.authReducer.loading,
  );
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(loadingState);
  }, [loadingState]);

  return (
    <React.Fragment>
      <DenseHeader to="/" text="Login" />
      <Main style={{ display: loading ? 'flex' : 'none' }}>
        <CircularProgress
          style={{ color: darkGreen, margin: 'auto', marginTop: '200px' }}
        />
      </Main>
      <Main style={{ display: loading ? 'none' : 'flex' }}>
        <Container>
          <IMG
            src="images/propaganda.png"
            alt="Propaganda alusiva ao desperdício de Alimentos"
          />
          <P>Insira suas informações para entrar:</P>
          <Form />
        </Container>
      </Main>
    </React.Fragment>
  );
}

export default Login;
