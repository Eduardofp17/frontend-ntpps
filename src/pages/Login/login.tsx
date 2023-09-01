import { useState, useEffect } from 'react';
import { Container, IMG, Main, P } from './styled';
import DenseHeader from '../../components/headers/dense';
import Form from '../../components/forms/loginForm/form';
import { useSelector } from 'react-redux';
import { States } from '../../store/globalTypes';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Navigate } from 'react-router-dom';
import Footer from '../../components/footer';
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
    <>
      <DenseHeader text="Login" />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading ? true : false}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {loggedIn ? (
        <Navigate to="/tools" />
      ) : (
        <Main>
          <Container>
            <IMG
              src="images/Nourishnet.svg"
              alt="Propaganda alusiva ao desperdício de Alimentos"
              width={400}
            />
            <P>Insira suas informações para entrar:</P>
            <Form />
          </Container>
        </Main>
      )}
      <Footer />
    </>
  );
}

export default Login;
