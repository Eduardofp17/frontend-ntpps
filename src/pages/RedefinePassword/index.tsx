import React from 'react';
import DenseHeader from '../../components/headers/dense';
import { Main, FormHTML } from './styled';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import { Visibility } from '@mui/icons-material';
import { VisibilityOff } from '@mui/icons-material';
import ContainedButton from '../../components/buttons/contained';
import axios from '../../services/axios';

function RedefinePassword() {
  document.title = 'Redefinir senha';
  const token = document.location.search.split('').slice(1).join('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [password, setPassword] = React.useState<string>('');
  const [confirmPassword, setConfirmPassword] = React.useState<string>('');
  const [passwordError, setPasswordError] = React.useState<boolean>(false);
  const [confirmPasswordError, setConfirmPasswordError] =
    React.useState<boolean>(false);
  const [passwordErrorMessage, setPasswordErrorMessage] =
    React.useState<string>('');
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    React.useState<string>('');
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };
  React.useEffect(() => {
    setPassword(password.split(' ').join(''));
    setConfirmPassword(confirmPassword.split(' ').join(''));
    isValidPasswords();
  }, [password, confirmPassword]);
  const isValidPasswords = (): boolean => {
    if (password.length > 0 && password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Senha inválida');
      setConfirmPasswordError(false);
      return false;
    }
    if (confirmPassword.length > 0 && confirmPassword.length < 6) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMessage('Senha inválida');
      setPasswordError(false);
      return false;
    }
    if (password !== confirmPassword) {
      setPasswordError(true);
      setPasswordErrorMessage('As senhas não coincidem');
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMessage('As senhas não coincidem');
      return false;
    }
    setPasswordError(false);
    setConfirmPasswordError(false);
    return true;
  };
  const handleSubmit = async () => {
    if (!isValidPasswords()) return;
    try {
      await axios.put(`/users/redefine/${token}`, { password });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <React.Fragment>
      <DenseHeader text="Redefinir senha" to="/" />
      <Main>
        <h3>Digite a sua nova senha: </h3>
        <FormHTML>
          <div
            className="inputs"
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <FormControl
              sx={{ m: 1, width: '30ch' }}
              variant="standard"
              error={passwordError}
            >
              <InputLabel htmlFor="standard-adornment-password">
                Nova senha
              </InputLabel>
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
            <FormControl
              sx={{ m: 1, width: '30ch' }}
              variant="standard"
              error={confirmPasswordError}
            >
              <InputLabel htmlFor="standard-adornment-confirm-password">
                Confirmar nova senha
              </InputLabel>
              <Input
                id="standard-adornment-confirm-password"
                aria-describedby="component-error-text"
                type={showPassword ? 'text' : 'password'}
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
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
                style={{ display: confirmPasswordError ? 'flex' : 'none' }}
              >
                {confirmPasswordErrorMessage}
              </FormHelperText>
            </FormControl>
          </div>
          <ContainedButton
            textButton="Redefinir senha"
            onClick={() => handleSubmit()}
          />
        </FormHTML>
      </Main>
    </React.Fragment>
  );
}

export default RedefinePassword;
