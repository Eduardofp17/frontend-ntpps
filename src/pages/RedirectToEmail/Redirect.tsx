import { Main, Container } from './styled';
import ContainedButton from '../../components/buttons/contained';
import Erro404 from '../Erro 404/404';
import { useSelector } from 'react-redux';
import { States } from '../../store/globalTypes';
import Footer from '../../components/footer';
function RedirectToEmail(): JSX.Element {
  document.title = 'Email enviado!';
  const registered: boolean = useSelector(
    (state: States): boolean => state.registerReducer.registered,
  );
  return (
    <>
      {registered ? (
        <>
          <Main>
            <Container>
              <h2>Enviamos um link no seu email.</h2>
              <h3>
                Clicando nele você poderá confirmar que seu email é válido
              </h3>
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

export default RedirectToEmail;
