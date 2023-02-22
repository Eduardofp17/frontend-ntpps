import './Home.css';
import React from 'react';
import { Main, IMG } from './styled';
import Stack from '@mui/material/Stack';
import ContainedButton from '../../components/buttons/contained';
import OutlinedButton from '../../components/buttons/outlined';

function Home(): JSX.Element {
  return (
    <React.Fragment>
      <Main>
        <IMG
          src="images/propaganda.png"
          alt="Propaganda alusiva ao desperdício de Alimentos"
        />
        <Stack spacing={2} direction="column">
          <OutlinedButton textButton="Ver Cardápio" to="/cardapios" />
          <ContainedButton textButton="Login" to="/login" />
        </Stack>
      </Main>
    </React.Fragment>
  );
}

export default Home;
