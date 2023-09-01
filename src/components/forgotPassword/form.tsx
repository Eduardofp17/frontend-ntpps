import { useEffect, useState } from 'react';
import isEmail from 'validator/lib/isEmail';
import { TextField, FormControl, Link } from '@mui/material';

import { FormHTML } from './styled';
import { darkGreen } from '../../config/collors/colors';
import ContainedButton from '../buttons/contained';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import axios from '../../services/axios';

function EmailForm(): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
  const [alert, setAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (email.length > 0) {
      setEmailError(isInvalidEmail());
    }
    if (email.length === 0) setEmailError(false);
  }, [email]);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();

      if (isInvalidEmail()) {
        setError(true);
        setAlertMessage('Email inválido');
        setAlert(true);
        setTimeout(() => setError(false), 2500);
        return;
      }
      await axios.post('/users/forgotPassword/', { email });
      setAlert(true);
      setAlertMessage(
        'Enviamos um link para o seu email, clicando nele você poderá redefinir sua senha',
      );
      setTimeout(() => setAlert(false), 2500);
    } catch (e) {
      return 'An error ocurred';
    }
  };

  const isInvalidEmail = (): boolean => {
    if (!isEmail(email)) {
      setEmailErrorMessage('Email inválido.');
      return true;
    }
    return false;
  };

  return (
    <>
      <Alert
        severity={error ? 'error' : 'success'}
        style={{
          maxWidth: '300px',
          display: alert ? 'flex' : 'none',
          textAlign: 'center',
        }}
      >
        <AlertTitle>{alertMessage}</AlertTitle>
      </Alert>
      <FormHTML method="post" style={{ minWidth: '100%' }}>
        <FormControl sx={{ m: 1, width: '100%' }} variant="standard">
          <TextField
            type="email"
            id="email-basic"
            label="Email"
            variant="standard"
            helperText={emailError ? emailErrorMessage : ''}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
          />
        </FormControl>

        <ContainedButton
          textButton="Enviar Link"
          onClick={(e) => handleSubmit(e)}
        />
      </FormHTML>

      <p style={{ fontSize: '14px' }}>
        Não tem uma conta?{' '}
        <Link
          component="a"
          variant="body2"
          href="/createAccount"
          style={{
            textAlign: 'right',
            color: darkGreen,
            margin: '5px 5px 20px 0px ',
            textDecorationColor: darkGreen,
          }}
        >
          Solicitar conta.
        </Link>{' '}
      </p>
    </>
  );
}

export default EmailForm;
