import React, { useState, useEffect } from 'react';
import {
  TextField,
  InputLabel,
  Input,
  InputAdornment,
  FormControl,
  FormHelperText,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormHTML, P } from './styled';
import isEmail from 'validator/lib/isEmail';
import ContainedButton from '../buttons/contained';
import { useDispatch } from 'react-redux';
import { RegisterRequest } from '../../store/modules/register/index';
function UserForm(): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [repeatPasswordError, setRepeatPasswordError] = useState(false);
  const [repeatPasswordErrorMessage, setRepeatPasswordErrorMessage] =
    useState('');
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const dispatch = useDispatch();
  useEffect(() => {
    if (email.length > 0) {
      setEmailError(isInvalidEmail());
    }
    if (password.length > 0) {
      setPasswordError(isInvalidPassword());
      setPassword(password.split(' ').join(''));
    }

    if (repeatPassword.length > 0) {
      setRepeatPasswordError(isInvalidRePassword());
      setRepeatPassword(repeatPassword.split(' ').join(''));
    }
    if (email.length === 0) setEmailError(false);
    if (password.length === 0) setPasswordError(false);
    if (repeatPassword.length === 0) setRepeatPasswordError(false);
  }, [email, password, repeatPassword]);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
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
      setPasswordErrorMessage('A senha deve ter no mínimo 6 caracteres');
      return true;
    }
    if (password !== repeatPassword) {
      setPasswordErrorMessage('As senhas não coincidem');
      return true;
    }
    return false;
  };

  const isInvalidRePassword = (): boolean => {
    if (repeatPassword.length < 6) {
      setRepeatPasswordErrorMessage('A senha deve ter no mínimo 6 caracteres');
      return true;
    }
    if (repeatPassword !== password) {
      setRepeatPasswordErrorMessage('As senhas não coincidem');
      return true;
    }
    return false;
  };
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(RegisterRequest());
    console.log({ password, repeatPassword });
  };
  return (
    <React.Fragment>
      <P>Insira sua informações para solicitar uma conta: </P>
      <FormHTML method="post">
        <FormControl sx={{ m: 1, width: '30ch' }}>
          <TextField
            type="text"
            id="name-basic"
            label="Nome"
            variant="standard"
            placeholder="João"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '30ch' }}>
          <TextField
            type="text"
            id="lastName-basic"
            label="Sobrenome"
            variant="standard"
            placeholder="Silva"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '30ch' }}>
          <TextField
            type="text"
            id="code-basic"
            label="Código"
            variant="standard"
            placeholder="#EX4Mpl3"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '30ch' }}>
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
          sx={{ m: 1, width: '30ch' }}
          variant="standard"
          error={passwordError}
        >
          <InputLabel htmlFor="standard-adornment-password">Senha</InputLabel>
          <Input
            id="standard-adornment-password"
            aria-describedby="component-error-text"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
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
        <FormControl
          sx={{ m: 1, width: '30ch' }}
          variant="standard"
          error={repeatPasswordError}
        >
          <InputLabel htmlFor="standard-adornment-repeat-password">
            Confirmar senha
          </InputLabel>
          <Input
            id="standard-adornment-repeat-password"
            aria-describedby="component-error-text-repeat"
            type={showPassword ? 'text' : 'password'}
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText
            id="component-error-text-repeat"
            style={{ display: repeatPasswordError ? 'flex' : 'none' }}
          >
            {repeatPasswordErrorMessage}
          </FormHelperText>
        </FormControl>
        <ContainedButton
          textButton="Criar conta"
          onClick={(e) => handleSubmit(e)}
        />
      </FormHTML>
    </React.Fragment>
  );
}

export default UserForm;
