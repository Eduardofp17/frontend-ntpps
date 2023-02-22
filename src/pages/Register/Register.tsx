import './Register.css';
import React, { useState, useEffect } from 'react';
import { Container, Main } from './styled';
import DenseHeader from '../../components/headers/dense';
import FormUser from '../../components/registerUserForm/form';
import FormInstituicao from '../../components/registerInstituicaoForm/form';
import { useSelector } from 'react-redux';
import { GetAuthState } from '../../store/modules/auth/types';
import { CircularProgress } from '@mui/material';
import { darkGreen, primaryGreen } from '../../config/collors/colors';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
function Register(): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [commonUser, setCommonUser] = useState(false);
  const loadingState = useSelector(
    (state: GetAuthState): boolean => state.authReducer.loading,
  );
  useEffect(() => {
    setLoading(loadingState);
  }, [loadingState]);
  const handleClickUser = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCommonUser(false);
  };
  const handleClickInstituicao = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCommonUser(true);
  };
  return (
    <React.Fragment>
      <DenseHeader to="/login" text="Solicitar conta" />

      <Main style={{ display: loading ? 'flex' : 'none' }}>
        <CircularProgress
          style={{ color: darkGreen, margin: 'auto', marginTop: '200px' }}
        />
      </Main>
      <Main style={{ display: loading ? 'none' : 'flex' }}>
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
            <Button
              className="ButtonGroup"
              sx={{
                bgcolor: commonUser ? primaryGreen : darkGreen,
                ':not(:last-of-type)': {
                  borderColor: '#fff',
                },
                ':hover': {
                  backgroundColor: darkGreen,
                },
              }}
              onClick={(e) => handleClickUser(e)}
            >
              Usuário
            </Button>
            <Button
              sx={{
                bgcolor: commonUser ? darkGreen : primaryGreen,
                ':hover': {
                  backgroundColor: darkGreen,
                },
              }}
              onClick={(e) => handleClickInstituicao(e)}
            >
              Instituição
            </Button>
          </ButtonGroup>
          {commonUser ? <FormInstituicao /> : <FormUser />}
        </Container>
      </Main>
    </React.Fragment>
  );
}

export default Register;
