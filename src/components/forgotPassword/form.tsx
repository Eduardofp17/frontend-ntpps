import React, { useState, useEffect } from 'react';
import isEmail from 'validator/lib/isEmail';
import { useDispatch } from 'react-redux';
import { TextField, FormControl, Link } from '@mui/material';

import { FormHTML } from './styled';
import { darkGreen } from '../../config/collors/colors';
import ContainedButton from '../buttons/contained';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useSelector } from 'react-redux';
import { GetAuthState } from '../../store/modules/auth/types';
import { AuthRequest } from '../../store/modules/auth';
function EmailForm(): JSX.Element {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  const [error, setError] = useState(false);
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();
  const err = useSelector(
    (state: GetAuthState) => state.authReducer.errorMessage,
  );

  useEffect(() => {
    if (email.length > 0) {
      setEmailError(isInvalidEmail());
    }
    if (email.length === 0) setEmailError(false);
  }, [email]);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isInvalidEmail()) {
      dispatch(AuthRequest({ email, password: 'asda' }));
      if (err.length > 0) {
        setError(true);
        setErrors([err]);
        setTimeout(() => setError(false), 2500);
      }
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
        severity="error"
        style={{
          maxWidth: '300px',
          display: error ? 'flex' : 'none',
          textAlign: 'center',
        }}
      >
        <AlertTitle>{errors[0]}</AlertTitle>
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
