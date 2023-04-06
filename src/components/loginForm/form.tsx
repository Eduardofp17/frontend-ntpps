import React, { useState, useEffect } from 'react';
import isEmail from 'validator/lib/isEmail';
import { useDispatch } from 'react-redux';
import {
  TextField,
  InputLabel,
  Input,
  InputAdornment,
  FormControl,
  Link,
  FormHelperText,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Visibility } from '@mui/icons-material';
import { VisibilityOff } from '@mui/icons-material';
import { FormHTML } from './styled';
import { darkGreen } from '../../config/collors/colors';
import ContainedButton from '../buttons/contained';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useSelector } from 'react-redux';
import { States } from '../../store/globalTypes';
import { AuthRequest } from '../../store/modules/auth';
function LoginForm(): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const err = useSelector((state: States) => state.authReducer.errorMessage);
  useEffect(() => {
    if (password.length > 0) {
      setPasswordError(isInvalidPassword());
      setPassword(password.split(' ').join(''));
    }
    if (email.length > 0) {
      setEmailError(isInvalidEmail());
    }
    if (email.length === 0) setEmailError(false);
    if (password.length === 0) setPasswordError(false);
  }, [email, password]);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isInvalidEmail() && !isInvalidPassword()) {
      dispatch(AuthRequest({ email, password }));
      if (err.length > 0) {
        setError(true);
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
  const isInvalidPassword = (): boolean => {
    if (password.length < 6) {
      setPasswordErrorMessage('A senha deve ter no mínimo 6 caracteres.');
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
        <AlertTitle>Email ou senha inválidos</AlertTitle>
      </Alert>
      <FormHTML method="post" style={{ justifyContent: 'center' }}>
        <FormControl sx={{ m: 1, width: '95%' }} variant="standard">
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
        <FormControl
          sx={{ m: 1, width: '95%' }}
          variant="standard"
          error={passwordError}
        >
          <InputLabel htmlFor="standard-adornment-password">Senha</InputLabel>
          <Input
            id="standard-adornment-password"
            aria-describedby="component-error-text"
            type={showPassword ? 'text' : 'password'}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText
            id="component-error-text"
            style={{ display: passwordError ? 'flex' : 'none' }}
          >
            {passwordErrorMessage}
          </FormHelperText>
        </FormControl>

        <Link
          component="a"
          variant="body2"
          href="/forgotpassword"
          style={{
            textAlign: 'right',
            color: darkGreen,
            margin: '5px 5px 20px 0px ',
            borderColor: darkGreen,
          }}
        >
          Esqueci minha senha
        </Link>
        <ContainedButton textButton="Entrar" onClick={(e) => handleSubmit(e)} />
      </FormHTML>

      <p style={{ fontSize: '14px' }}>
        Não tem uma conta?{' '}
        <Link
          component="a"
          variant="body2"
          href="/createaccount"
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

export default LoginForm;
