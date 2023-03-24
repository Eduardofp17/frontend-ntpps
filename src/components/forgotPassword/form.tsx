import React from 'react';
import isEmail from 'validator/lib/isEmail';
import { useDispatch } from 'react-redux';
import { TextField, FormControl, Link } from '@mui/material';

import { FormHTML } from './styled';
import { darkGreen } from '../../config/collors/colors';
import ContainedButton from '../buttons/contained';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useSelector } from 'react-redux';
import { States } from '../../store/globalTypes';
import { AuthRequest } from '../../store/modules/auth';

function EmailForm(): JSX.Element {
  const [email, setEmail] = React.useState<string>('');
  const [emailError, setEmailError] = React.useState<boolean>(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState<string>('');
  const [alert, setAlert] = React.useState<boolean>(false);
  const [alertMessage, setAlertMessage] = React.useState<string>('');
  const [error, setError] = React.useState<boolean>(false);
  const [errors, setErrors] = React.useState<string[]>([]);

  const dispatch = useDispatch();
  const err = useSelector((state: States) => state.authReducer.errorMessage);

  React.useEffect(() => {
    if (email.length > 0) {
      setEmailError(isInvalidEmail());
    }
    if (email.length === 0) setEmailError(false);
  }, [email]);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!isInvalidEmail()) {
      // dispatch(AuthRequest({ email, password: 'asda' }));
      console.log('Redefinir senha');

      if (err.length > 0) {
        setError(true);
        setErrors(err);
        setAlert(true);
        setTimeout(() => setError(false), 2500);
        return;
      }
      setAlert(true);
      setAlertMessage(
        'Enviamos um link para o seu email, clicando nele você poderá redefinir sua senha',
      );
      setTimeout(() => setAlert(false), 2500);
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
    <React.Fragment>
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
      <FormHTML method="post">
        <FormControl sx={{ m: 1, width: '30ch' }} variant="standard">
          <TextField
            type="email"
            id="email-basic"
            label="Email"
            variant="standard"
            helperText={emailError ? emailErrorMessage : ''}
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
          }}
        >
          Solicitar conta.
        </Link>{' '}
      </p>
    </React.Fragment>
  );
}

export default EmailForm;
