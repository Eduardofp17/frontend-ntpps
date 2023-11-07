import DenseHeader from '../../../components/headers/dense';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FormControl,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  TextareaAutosize,
  Typography,
  Rating,
  FormHelperText,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import ContainedButton from '../../../components/buttons/contained';
import axios from '../../../services/axios';
import { School } from '../../../store/globalTypes';
import { Paper } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
const FormSchema = z.object({
  fullName: z.string().nonempty('Seu nome completo é obrigatório'),
  food: z
    .string()
    .nonempty(
      'É obrigatório que você informe o alimento em que você deseja dar o feedback',
    ),
  email: z.string().nonempty('Seu email é obrigatório').email('Email inválido'),
  instituicao: z.string().nonempty('Selecione a sua instituição'),
  feedback: z
    .string()
    .nonempty('Seu feedback precisa ter ao menos 15 caracteres')
    .min(15, 'Seu feedback precisa ter ao menos 15 caracteres'),
});

function CardapioFeedback(): JSX.Element {
  const [schools, setSchools] = useState<School[]>([]);
  const [email, setEmail] = useState<string>('');
  const [food, setFood] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [selectValue, setSelectValue] = useState('');
  const [error, setError] = useState<boolean>(false);
  const [alert, setAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FormSchema),
  });

  //eslint-disable-next-line
  const SendFeedback = async (data: any) => {
    try {
      setLoading(true);
      const response = await axios.post('/email/enviar-feedback/', {
        email: selectValue,
        subject:
          'Esse é um email de teste. Caso tenha recebido o mesmo, saiba que foi um engano',
        userName: data.fullName,
        userEmail: data.email,
        food: data.food,
        rating: rating,
        feedback: data.feedback,
      });
      setLoading(false);
      if (response.status === 200) {
        toast.success('Feedback enviado com sucesso');
      }
      return;
    } catch (e) {
      toast.error('Internal Server Error');
    }
  };
  useEffect(() => {
    (async function getData() {
      const { data } = await axios.get('/school/');
      setSchools(data);
    })();
  }, []);

  return (
    <>
      <DenseHeader text="Feedback" />
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
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: '500px',
          padding: '20px',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 'auto',
        }}
      >
        <Paper
          key={1}
          elevation={1}
          sx={{
            padding: '10px 10px',
            marginTop: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            maxWidth: '100%',
          }}
        >
          <h2>Envie seu feedback para sua instituição</h2>
          <form
            style={{ width: '95%', margin: 'auto' }}
            onSubmit={handleSubmit(SendFeedback)}
          >
            <FormControl sx={{ m: 1, width: '95%' }}>
              <TextField
                type="text"
                id="name-basic"
                label="Nome Completo *"
                variant="outlined"
                size="small"
                {...register('fullName')}
                error={Boolean(errors.fullName)}
                onChange={(e) => setFullName(e.target.value)}
                helperText={
                  errors.fullName ? String(errors.fullName?.message) : ''
                }
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: '95%' }}>
              <TextField
                type="email"
                id="email-basic"
                label="Seu email *"
                variant="outlined"
                size="small"
                {...register('email')}
                onChange={(e) => setEmail(e.target.value)}
                error={Boolean(errors.email)}
                helperText={errors.email ? String(errors.email?.message) : ''}
              />
            </FormControl>
            <FormControl
              variant="outlined"
              sx={{ m: 1, width: '95%' }}
              size="small"
            >
              <InputLabel
                id="demo-simple-select-standard-label"
                error={Boolean(errors.instituicao)}
              >
                Instituição
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                label="Instituição"
                size="small"
                style={{ textAlign: 'left', fontSize: '14px' }}
                {...register('instituicao')}
                error={Boolean(errors.instituicao)}
                value={selectValue}
                onChange={(e) => setSelectValue(e.target.value)}
              >
                {schools.map((school) => (
                  <MenuItem
                    value={school.email}
                    key={school.id}
                    style={{
                      textAlign: 'left',
                      fontSize: '12px',
                    }}
                  >
                    {school.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText
                id="component-error-text"
                error={Boolean(errors.instituicao)}
                style={{
                  display: errors.instituicao ? 'flex' : 'none',
                }}
              >
                {errors.instituicao ? String(errors.instituicao?.message) : ''}
              </FormHelperText>
            </FormControl>
            <FormControl sx={{ m: 1, width: '95%' }}>
              <TextField
                type="text"
                id="food-of-day-basic"
                label="Alimento que você deseja opinar *"
                variant="outlined"
                size="small"
                {...register('food')}
                onChange={(e) => setFood(e.target.value)}
                error={Boolean(errors.food)}
                helperText={errors.food ? String(errors.food?.message) : ''}
              />
            </FormControl>
            <FormControl
              sx={{
                m: 1,
                width: '95%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography component="legend">
                Dê uma nota para o cardápio desse dia:
              </Typography>
              <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                  setRating(Number(newValue));
                }}
                size="large"
              />
            </FormControl>
            <FormControl
              variant="outlined"
              sx={{ m: 1, width: '95%' }}
              size="small"
            >
              <TextareaAutosize
                aria-label="empty textarea"
                placeholder={'Seu feedback precisa ter ao menos 15 caracteres'}
                {...register('feedback')}
                style={{ maxWidth: '100%' }}
              />
            </FormControl>
            <div className="buttonSubmit" style={{ marginTop: '20px' }}>
              <ContainedButton textButton="Enviar feedback" width="100%" />
            </div>
          </form>
        </Paper>
      </main>
    </>
  );
}

export default CardapioFeedback;
