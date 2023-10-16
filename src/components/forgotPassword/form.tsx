import { useEffect, useState } from 'react';
import isEmail from 'validator/lib/isEmail';
import { TextField, FormControl, Link } from '@mui/material';

import { FormHTML } from './styled';
import { darkGreen } from '../../config/collors/colors';
import ContainedButton from '../buttons/contained';
import axios from '../../services/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function EmailForm(): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (email.length > 0) {
      setEmailError(isInvalidEmail());
    }
    if (email.length === 0) setEmailError(false);
  }, [email]);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      await axios.post('/users/forgotPassword/', { email });
      setLoading(false);
      setSuccess(true);
    } catch (e) {
      setLoading(false);
      toast.error('Email ou senha inválidos', {
        toastId: 'unique-toast-id',
      });
    }
  };

  const isInvalidEmail = (): boolean => {
    if (!isEmail(email)) {
      setEmailErrorMessage('Email inválido.');
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (success) {
      toast.success(
        'Enviamos um link para o seu email, clicando nele você poderá redefinir sua senha',
        {
          toastId: 'unique-toast-id',
        },
      );
      setSuccess(false);
    }
  });
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
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading ? true : false}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <FormHTML
        method="post"
        style={{
          width: '100%',
          margin: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
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
          disabled={emailError}
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
