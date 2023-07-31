import React, { useState, useEffect } from 'react';
import { Container, IMG, Main, P } from './styled';
import DenseHeader from '../../components/headers/dense';
import Form from '../../components/forms/loginForm/form';
import { useSelector } from 'react-redux';
import { States } from '../../store/globalTypes';
import { CircularProgress } from '@mui/material';
import { darkGreen } from '../../config/collors/colors';
import { Navigate } from 'react-router-dom';
function Login(): JSX.Element {
  document.title = 'Login';
  const loadingState = useSelector(
    (state: States): boolean => state.authReducer.loading,
  );
  const loggedInState = useSelector(
    (state: States): boolean => state.authReducer.loggedIn,
  );
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    setLoading(loadingState);
    setLoggedIn(loggedInState);
  }, [loadingState, loadingState]);
  return (
    <React.Fragment>
      <DenseHeader text="Login" />
      <div style={{ display: loading ? 'flex' : 'none' }}>
        <CircularProgress
          style={{ color: darkGreen, margin: 'auto', marginTop: '200px' }}
        />
      </div>
      {loggedIn ? (
        <Navigate to="/tools" />
      ) : (
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
      )}
    </React.Fragment>
  );
}

export default Login;
