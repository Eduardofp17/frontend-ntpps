import { useState } from 'react';
import { Container, Main } from './styled';
import DenseHeader from '../../components/headers/dense';
import FormUser from '../../components/forms/registerUserForm/form';
import FormInstituicao from '../../components/forms/registerInstituicaoForm/form';
import { useSelector } from 'react-redux';
import { States } from '../../store/globalTypes';
import ButtonGroup from '@mui/material/ButtonGroup';
import Footer from '../../components/footer';
import { RadioGroup, FormControlLabel, Radio } from '@mui/material';
import RedirectToEmail from '../RedirectToEmail/Redirect';

function Register(): JSX.Element {
  document.title = 'Solicitar conta';
  const [commonUser, setCommonUser] = useState(true);

  const registeredUser = useSelector(
    (state: States): boolean => state.registerUserReducer.registered,
  );
  const registeredInstituition = useSelector(
    (state: States): boolean => state.registerInstituitionReducer.registered,
  );
  return (
    <>
      <DenseHeader text="Solicitar conta" />
      {registeredUser || registeredInstituition ? (
        registeredUser ? (
          <RedirectToEmail isInstituition={false} />
        ) : (
          <RedirectToEmail isInstituition={true} />
        )
      ) : (
        <Main>
          <Container>
            <h3>Selecione o tipo de conta: </h3>
            <ButtonGroup
              variant="contained"
              aria-label="Disabled elevation buttons"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                background: 'none',
                boxShadow: 'none',
              }}
            >
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                sx={{ display: 'flex', flexDirection: 'row' }}
                value={commonUser ? 'common-user' : 'instituition'}
                onChange={(e) => {
                  if (e.target.value === 'common-user') {
                    setCommonUser(true);
                  } else {
                    setCommonUser(false);
                  }
                }}
              >
                <FormControlLabel
                  value="common-user"
                  control={<Radio />}
                  label="Usuário comum"
                />
                <FormControlLabel
                  value="instituition"
                  control={<Radio />}
                  label="Instituição"
                />
              </RadioGroup>
            </ButtonGroup>
            {commonUser ? <FormUser /> : <FormInstituicao />}
          </Container>
        </Main>
      )}
      <Footer />
    </>
  );
}

export default Register;
