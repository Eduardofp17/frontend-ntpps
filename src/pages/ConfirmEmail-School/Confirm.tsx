import { useEffect } from 'react';
import { Main, Container } from './styled';
import ContainedButton from '../../components/buttons/contained';
import Erro404 from '../Erro 404/404';
import { useSelector } from 'react-redux';
import { States } from '../../store/globalTypes';
import axios from '../../services/axios';
import Footer from '../../components/footer';

function ConfirmEmailSchool(): JSX.Element {
  const token = document.location.search.split('').slice(1).join('');
  const registered: boolean = useSelector(
    (state: States): boolean => state.registerInstituitionReducer.registered,
  );

  useEffect(() => {
    async function getConfirm() {
      try {
        await axios.get(`/school/confirm/${token}`);
        document.title = 'Email confirmado';
      } catch (e) {
        return 'An error ocurred';
      }
    }
    getConfirm();
  }, []);
  return (
    <>
      {registered ? (
        <>
          <Main>
            <Container>
              <h2>Email confirmado com sucesso!</h2>
              <h3>Faça login e comece a usar nossa plataforma.</h3>
              <ContainedButton textButton="Início" to="/" />
            </Container>
          </Main>
          <Footer />
        </>
      ) : (
        <Erro404 />
      )}
    </>
  );
}

export default ConfirmEmailSchool;
