import { Main, Container } from './styled';

interface Props {
  isInstituition: boolean;
}
function RedirectToEmail(props: Props): JSX.Element {
  document.title = 'Email enviado!';
  return (
    <>
      {props.isInstituition ? (
        <>
          <Main>
            <Container>
              <h2>Quase Lá!</h2>
              <p>
                Um email foi enviado de{' '}
                <strong>naescolaalimentacao@gmail.com</strong> com um link para
                verificar o seu endereço de email.
              </p>
              <p>
                Ao clicar nele, você poderá confirmar a validade do seu email.
                Após isso, a conta da sua instituição estará pronta para uso.
              </p>
            </Container>
          </Main>
        </>
      ) : (
        <>
          <Main>
            <Container>
              <h1>Quase Lá!</h1>
              <p>
                Um email foi enviado de{' '}
                <strong>naescolaalimentacao@gmail.com</strong> com um link para
                verificar o seu endereço de email.
              </p>
              <p>
                Ao clicar nele, você poderá confirmar a validade do seu email.
              </p>
              <p>
                Depois disso, basta aguardar a aceitação da sua instituição para
                que sua conta seja criada. Após a aprovação, você poderá fazer
                login com o email e a senha que inseriu durante o processo de
                registro.
              </p>
            </Container>
          </Main>
        </>
      )}
    </>
  );
}

export default RedirectToEmail;
