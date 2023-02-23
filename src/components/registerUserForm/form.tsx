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
import { States } from '../../store/globalTypes';
import { RegisterErrors } from '../../store/modules/register/types';
import { useSelector } from 'react-redux';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
function UserForm(): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState('');
  const [lastname, setLastame] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [nameError, setNameError] = useState(false);
  const [lastnameError, setLastnameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [codeError, setCodeError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [repeatPasswordError, setRepeatPasswordError] = useState(false);
  const [error, setError] = useState(false);

  const [errors, setErrors] = useState('');
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [lastnameErrorMessage, setLastnameErrorMessage] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [codeErrorMessage, setCodeErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [repeatPasswordErrorMessage, setRepeatPasswordErrorMessage] =
    useState('');
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const dispatch = useDispatch();
  const err: RegisterErrors = useSelector(
    (state: States): RegisterErrors => state.registerReducer.errorMessage,
  );

  useEffect(() => {
    if (name.length > 0) {
      setNameError(isInvalidName());
    }
    if (lastname.length > 0) {
      setLastnameError(isInvalidLastname());
    }
    if (email.length > 0) {
      setEmailError(isInvalidEmail());
    }
    if (code.length > 1) {
      setCodeError(isInvalidCode());
      setCode(code.split(' ').join(''));
    }
    if (password.length > 0) {
      setPasswordError(isInvalidPassword());
      setPassword(password.split(' ').join(''));
    }

    if (repeatPassword.length > 0) {
      setRepeatPasswordError(isInvalidRePassword());
      setRepeatPassword(repeatPassword.split(' ').join(''));
    }

    if (name.length === 0) setNameError(false);
    if (lastname.length === 0) setLastnameError(false);
    if (email.length === 0) setEmailError(false);
    if (code.length === 0) {
      setCodeError(false);
      setCode('#');
    }
    if (password.length === 0) setPasswordError(false);
    if (repeatPassword.length === 0) setRepeatPasswordError(false);
  }, [name, lastname, email, code, password, repeatPassword]);

  useEffect(() => {
    if (err.msg.length > 0) {
      setError(true);
      if (err.msg === 'School is not accepting new accounts') {
        setErrors('A instituição não está aceitando novas contas');
      }
      if (err.msg === "School don't exist") {
        setErrors('A instituição não existe');
      }
      if (err.msg === 'Request already exist') {
        setErrors('A solicitação já existe');
      }
      if (err.msg === 'User already exist') {
        setErrors('Usuário já existe');
      }
      setTimeout(() => setError(false), 4500);
    }
  }, [err, errors]);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const isInvalidName = (): boolean => {
    if (name.length < 3) {
      setNameErrorMessage('O nome deve ter no mínimo 3 caracteres.');
      return true;
    }
    return false;
  };
  const isInvalidLastname = (): boolean => {
    if (lastname.length < 3) {
      setLastnameErrorMessage('O sobrenome deve ter no mínimo 3 caracteres.');
      return true;
    }
    return false;
  };

  const isInvalidEmail = (): boolean => {
    if (!isEmail(email)) {
      setEmailErrorMessage('Email inválido.');
      return true;
    }
    return false;
  };
  const isInvalidCode = (): boolean => {
    if (code.length < 12) {
      setCodeErrorMessage('Código inválido.');
      return true;
    }
    if (code.length > 12) {
      setCodeErrorMessage('Código inválido');
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
    if (
      !isInvalidName() &&
      !isInvalidLastname() &&
      !isInvalidEmail() &&
      !isInvalidCode() &&
      !isInvalidPassword()
    ) {
      dispatch(RegisterRequest({ name, lastname, email, code, password }));
    }
  };
  return (
    <React.Fragment>
      <P>Insira sua informações para solicitar uma conta: </P>
      <Alert
        severity="error"
        style={{
          maxWidth: '300px',
          display: error ? 'flex' : 'none',
          textAlign: 'center',
          margin: 'auto',
        }}
      >
        <AlertTitle>{errors}</AlertTitle>
      </Alert>
      <FormHTML method="post" style={{ marginTop: error ? '10px' : '-20px' }}>
        <FormControl sx={{ m: 1, width: '30ch' }}>
          <TextField
            type="text"
            id="name-basic"
            label="Nome"
            variant="standard"
            placeholder="João"
            onChange={(e) => setName(e.target.value)}
            helperText={nameError ? nameErrorMessage : ''}
            error={nameError}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '30ch' }}>
          <TextField
            type="text"
            id="lastName-basic"
            label="Sobrenome"
            variant="standard"
            placeholder="Silva"
            onChange={(e) => setLastame(e.target.value)}
            helperText={lastnameError ? lastnameErrorMessage : ''}
            error={lastnameError}
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
        <FormControl sx={{ m: 1, width: '30ch' }}>
          <TextField
            type="text"
            id="code-basic"
            label="Código"
            variant="standard"
            placeholder="#EX4Mpl3"
            onChange={(e) => setCode(e.target.value)}
            helperText={codeError ? codeErrorMessage : ''}
            error={codeError}
            value={code}
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
