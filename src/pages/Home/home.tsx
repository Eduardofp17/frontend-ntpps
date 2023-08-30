import { Main, IMG } from './styled';
import Stack from '@mui/material/Stack';
import ContainedButton from '../../components/buttons/contained';
import OutlinedButton from '../../components/buttons/outlined';
import Footer from '../../components/footer';
function Tools(): JSX.Element {
  return (
    <>
      <Main>
        <IMG
          src="images/Nourishnet.svg"
          alt="Propaganda alusiva ao desperdício de Alimentos"
          width={400}
        />
        <Stack spacing={2} direction="column">
          <OutlinedButton textButton="Ver Cardápios" to="/cardapios" />
          <ContainedButton textButton="Login" to="/login" />
        </Stack>
      </Main>
      <Footer />
    </>
  );
}

export default Tools;
