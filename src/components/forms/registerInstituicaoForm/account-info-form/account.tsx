import { useEffect, useState } from 'react';
import {
  Checkbox,
  FormControlLabel,
  InputAdornment,
  FormHelperText,
  TextField,
  FormControl,
  InputLabel,
  Button,
  OutlinedInput,
  Link,
} from '@mui/material';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';
import { primaryGreen } from '../../../../config/collors/colors';
import IconButton from '@mui/material/IconButton';
import { Visibility } from '@mui/icons-material';
import { VisibilityOff } from '@mui/icons-material';
import isEmail from 'validator/lib/isEmail';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface Props {
  onNext: () => void;
  onLast: () => void;
  onAccountInfoChange: React.Dispatch<
    React.SetStateAction<{
      email: string;
      password: string;
      agreeWithTermsAndPrivacyPolicy: boolean;
    }>
  >;
  accountInfo: {
    email: string;
    password: string;
    agreeWithTermsAndPrivacyPolicy: boolean;
  };
}

export function AccountInstituitionInfo(props: Props): JSX.Element {
  const [email, setEmail] = useState<string>(props.accountInfo.email);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
  const [password, setPassword] = useState<string>(props.accountInfo.password);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rePassword, setRePassword] = useState<string>('');
  const [rePasswordError, setRePasswordError] = useState<boolean>(false);
  const [rePasswordErrorMessage, setRePasswordErrorMessage] =
    useState<string>('');
  const [showRePassword, setShowRePassword] = useState<boolean>(false);
  const [agreeWithTermsAndPrivacyPolicy, setAgreeWithTermsAndPrivacyPolicy] =
    useState<boolean>(props.accountInfo.agreeWithTermsAndPrivacyPolicy);
  const { onNext, onAccountInfoChange, accountInfo, onLast } = props;

  //validation functions
  const isValidEmail = (): boolean => {
    if (!isEmail(email)) {
      setEmailErrorMessage('Email inválido.');
      setEmailError(true);
      return false;
    }
    setEmailError(false);
    setEmailErrorMessage('');
    return true;
  };

  const isValidPassword = (): boolean => {
    if (password.length < 6 && rePassword.length < 6) {
      setPasswordErrorMessage('A senha deve ter no mínimo 6 caracteres');
      setPasswordError(true);
      setRePasswordErrorMessage('A senha deve ter no mínimo 6 caracteres');
      setRePasswordError(true);
      return false;
    }

    if (password !== rePassword) {
      setPasswordErrorMessage('As senhas não coincidem');
      setPasswordError(true);
      setRePasswordErrorMessage('As senhas não coincidem');
      setRePasswordError(true);
      return false;
    }
    setPasswordError(false);
    setPasswordErrorMessage('');
    setRePasswordError(false);
    setRePasswordErrorMessage('');
    return true;
  };
  useEffect(() => {
    isValidEmail();
  }, [email]);
  useEffect(() => {
    isValidPassword();
  }, [password, rePassword]);
  useEffect(() => {
    setEmailError(false);
    setEmailErrorMessage('');
    setPasswordError(false);
    setPasswordErrorMessage('');
    setRePasswordError(false);
    setRePasswordErrorMessage('');
  }, []);

  //onChange functions
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };
  const handleEmailChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    onAccountInfoChange({ ...accountInfo, email: event.target.value });
    setEmail(event.target.value);
  };

  //show and hide password functions
  const handleClickShowRePassword = () => setShowRePassword((show) => !show);
  const handleMouseDownRePassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  //click functions
  const handleNextClick = () => {
    if (!isValidEmail() || !isValidPassword()) {
      return;
    }
    if (!agreeWithTermsAndPrivacyPolicy) {
      toast.error(
        'Para registrar-se em nossa plataforma você precisa estar de acordo com os nossos termos.',
        {
          toastId: 'unique-toast-id',
          position: 'top-right',
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: false,
          rtl: false,
          pauseOnFocusLoss: true,
          draggable: true,
          pauseOnHover: true,
          theme: 'light',
          bodyStyle: { width: '90%', maxWidth: '320px', margin: 'auto' },
        },
      );
      return;
    }
    onNext();
  };

  const handleLastClick = () => {
    onLast();
  };

  const handlePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    onAccountInfoChange({ ...accountInfo, password: event.target.value });
    setPassword(event.target.value);
  };
  const handleRePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRePassword(event.target.value);
  };
  const handleTermsAndPolicyPrivacyChange = () => {
    setAgreeWithTermsAndPrivacyPolicy(!agreeWithTermsAndPrivacyPolicy);
  };

  useEffect(() => {
    onAccountInfoChange({
      ...accountInfo,
      agreeWithTermsAndPrivacyPolicy: agreeWithTermsAndPrivacyPolicy,
    });
  }, [agreeWithTermsAndPrivacyPolicy]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ width: '90%', maxWidth: '320px', margin: 'auto' }}
      />
      <form>
        <FormControl
          sx={{
            m: 1,
            width: '95%',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <TextField
            type="email"
            id="email-basic"
            label="Email"
            variant="outlined"
            placeholder="example@example.com"
            value={email}
            style={{ border: 'none' }}
            required
            size="small"
            onChange={(e) => handleEmailChange(e)}
            autoComplete="email"
            helperText={emailError ? emailErrorMessage : ''}
            error={emailError}
          />
        </FormControl>

        <FormControl
          sx={{
            m: 1,
            width: '95%',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
          variant="outlined"
          size="small"
          error={passwordError}
          required
        >
          <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Senha"
            value={password}
            autoComplete="new-password"
            onChange={handlePasswordChange}
          />

          <FormHelperText
            id="component-error-text"
            style={{ display: passwordError ? 'flex' : 'none' }}
          >
            {passwordErrorMessage}
          </FormHelperText>
        </FormControl>
        <FormControl
          sx={{
            m: 1,
            width: '95%',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
          variant="outlined"
          size="small"
          error={rePasswordError}
          required
        >
          <InputLabel htmlFor="outlined-adornment-rePassword">
            Confirmar Senha
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-rePassword"
            type={showRePassword ? 'text' : 'password'}
            value={rePassword}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowRePassword}
                  onMouseDown={handleMouseDownRePassword}
                  edge="end"
                >
                  {showRePassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            autoComplete="new-password"
            onChange={handleRePasswordChange}
            label="Confirmar Senha"
          />

          <FormHelperText
            id="component-error-text"
            style={{ display: rePasswordError ? 'flex' : 'none' }}
          >
            {rePasswordErrorMessage}
          </FormHelperText>
        </FormControl>

        <FormControl
          size="small"
          sx={{
            m: 1,
            width: '95%',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            margin: 0,
          }}
        >
          <FormControlLabel
            sx={{ margin: 0 }}
            control={
              <Checkbox
                size="small"
                checked={agreeWithTermsAndPrivacyPolicy}
                onChange={handleTermsAndPolicyPrivacyChange}
              />
            }
            label={
              <p style={{ margin: 0, fontSize: '14px' }}>
                Concordo com os{' '}
                <Link href="/docs/terms-of-service">Termos de Serviço</Link> e a
                nossa{' '}
                <Link href="/docs/privacy-policy">Política de Privacidade</Link>
              </p>
            }
          />
        </FormControl>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'center',
          }}
        >
          <Button
            variant="outlined"
            size="small"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '140px',
              fontSize: '15px',
              gap: '5px',
              margin: '10px 5px',
              color: primaryGreen,
              fontWeight: 'bold',
              borderColor: primaryGreen,
              ':hover': {
                borderColor: primaryGreen,
              },
            }}
            onClick={handleLastClick}
          >
            <AiOutlineArrowLeft style={{ fontWeight: 'bold' }} /> Voltar
          </Button>
          <Button
            variant="contained"
            size="small"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '140px',
              fontSize: '15px',
              gap: '5px',
              margin: '10px 5px',
              backgroundColor: primaryGreen,
              ':hover': {
                backgroundColor: primaryGreen,
              },
            }}
            onClick={handleNextClick}
          >
            próximo <AiOutlineArrowRight />
          </Button>
        </div>
      </form>
    </>
  );
}
