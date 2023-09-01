import { useState, useEffect } from 'react';
import { Container, IMG, Main, P } from './styled';
import DenseHeader from '../../components/headers/dense';
import Form from '../../components/forgotPassword/form';
import { useSelector } from 'react-redux';
import { States } from '../../store/globalTypes';
import { CircularProgress } from '@mui/material';
import { darkGreen } from '../../config/collors/colors';
import Footer from '../../components/footer';
function Forgot(): JSX.Element {
  document.title = 'Esqueci minha senha';
  const loadingState = useSelector(
    (state: States): boolean => state.authReducer.loading,
  );
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(loadingState);
  }, [loadingState]);

  return (
    <>
      <DenseHeader text="Esqueci minha senha" />
      <Main style={{ display: loading ? 'flex' : 'none' }}>
        <CircularProgress
          style={{ color: darkGreen, margin: 'auto', marginTop: '200px' }}
        />
      </Main>
      <Main
        style={{
          display: loading ? 'none' : 'flex',
          marginTop: '0px',
        }}
      >
        <Container>
          <IMG
            src="/images/Nourishnet.svg"
            alt='Logo em png com o nome "Nourishnet.net" escrito. O texto tem a cor verde'
            width={400}
          />
          <P>Insira seu email para redefinir a sua senha:</P>
          <Form />
        </Container>
      </Main>
      <Footer />
    </>
  );
}

export default Forgot;
