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
import { Visibility } from '@mui/icons-material';
import { VisibilityOff } from '@mui/icons-material';
import { FormHTML, P } from './styled';
import { useDispatch } from 'react-redux';
import { RegisterRequest } from '../../store/modules/register/index';
import ContainedButton from '../buttons/contained';
import isEmail from 'validator/lib/isEmail';
import { useSelector } from 'react-redux';
import { States } from '../../store/globalTypes';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { RegisterErrors } from '../../store/modules/register/types';
function RegisterForm(): JSX.Element {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [cnpjError, setCnpjError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [repeatPasswordError, setRepeatPasswordError] = useState(false);
  const [error, setError] = useState(false);

  const [errors, setErrors] = useState('');
  const [cnpjErrorMessage, setCnpjErrorMessage] = useState('');
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [repeatPasswordErrorMessage, setRepeatPasswordErrorMessage] =
    useState('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const err: RegisterErrors = useSelector(
    (state: States): RegisterErrors => state.registerReducer.errorMessage,
  );
  useEffect(() => {
    if (name.length > 0) {
      setNameError(isInvalidName());
    }
    if (email.length > 0) {
      setEmailError(isInvalidEmail());
    }
    if (cnpj.length > 0) {
      setCnpjError(isInvalidCnpj());
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
    if (email.length === 0) setEmailError(false);
    if (password.length === 0) setPasswordError(false);
    if (repeatPassword.length === 0) setRepeatPasswordError(false);
  }, [name, email, cnpj, password, repeatPassword]);
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
  const isInvalidEmail = (): boolean => {
    if (!isEmail(email)) {
      setEmailErrorMessage('Email inválido.');
      return true;
    }
    return false;
  };
  const isInvalidCnpj = (): boolean => {
    if (cnpj.length < 14) {
      setCnpjErrorMessage('Cnpj inválido.');
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
      !isInvalidEmail() &&
      !isInvalidCnpj() &&
      !isInvalidPassword()
    ) {
      dispatch(RegisterRequest({ name, email, cnpj, password }));
      if (err) {
        setError(true);
        if (err.msg === 'School already exist') {
          setErrors('Instituição já cadastrada, tente efetuar login');
        }
        if (err.msg === 'Invalid Cnpj') {
          setErrors(
            'Cnpj inválido. Envie ele nesse formato: 99.999.999/9999-99',
          );
        }

        setTimeout(() => setError(false), 4500);
      }
    }
  };
  return (
    <React.Fragment>
      <P>Insira as informações de sua instituição: </P>
      <Alert
        severity="error"
        style={{
          maxWidth: '300px',
          display: error ? 'flex' : 'none',
          textAlign: 'center',
        }}
      >
        <AlertTitle>{errors}</AlertTitle>
      </Alert>
      <FormHTML method="post">
        <FormControl sx={{ m: 1, width: '30ch' }}>
          <TextField
            type="text"
            id="name-basic"
            label="Nome"
            variant="standard"
            onChange={(e) => setName(e.target.value)}
            error={nameError}
            helperText={nameError ? nameErrorMessage : ''}
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
            id="cnpj-basic"
            label="Cnpj"
            placeholder="99.999.999/9999-99"
            variant="standard"
            onChange={(e) => setCnpj(e.target.value)}
            error={cnpjError}
            helperText={cnpjError ? cnpjErrorMessage : ''}
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
                  {showPassword ? <Visibility /> : <VisibilityOff />}
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

export default RegisterForm;
