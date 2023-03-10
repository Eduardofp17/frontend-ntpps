import React from 'react';
import { Main, Card } from './styled';
import DenseHeader from '../../../components/headers/dense';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TextField } from '@mui/material';
import ContainedButton from '../../../components/buttons/contained';
import axios from '../../../services/axios';
import { States } from '../../../store/globalTypes';
import { useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { AxiosError } from 'axios';
function CriarCardapios(): JSX.Element {
  const [weekDay, setWeekDay] = React.useState<string>('');
  const [weekNum, setWeekNum] = React.useState<number>(0);
  const [snack, setSnack] = React.useState<string>('');
  const [lunch, setLunch] = React.useState<string>('');
  const [error, setError] = React.useState<boolean>(false);
  const [success, setSuccess] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>('');
  const [successMessage, setSuccessMessage] = React.useState<string>('');
  const [afternoonSnack, setAfternoonSnack] = React.useState<string>('');

  const token = useSelector((state: States): string => state.authReducer.token);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!snack && !lunch && !afternoonSnack) {
      setError(true);
      setErrorMessage('Preencha ao menos um dos campos abaixo: ');
      setTimeout(() => setError(false), 2500);
      return;
    }
    try {
      axios.defaults.headers.Authorization = `Bearer ${token}`;
      const response = await axios.post('/cardapio/', {
        dayname: weekDay,
        breakfast: snack,
        lunch,
        afternoonsnack: afternoonSnack,
        weeknumber: weekNum,
      });

      if (response.status === 200) {
        setSuccess(true);
        if (response.data.msg === 'Successfully created') {
          setSuccessMessage(`Cardápio criado com sucesso`);
        }
        setTimeout(() => setSuccess(false), 2500);
        return;
      }
    } catch (e) {
      const error = e as AxiosError;
      setError(true);
      if (
        error.response?.data ===
        'Cardapio already exist, please try to update it'
      ) {
        setErrorMessage('Cardápio já existe, tente atualizá-lo');
      }
      setTimeout(() => setError(false), 2500);
      return;
    }
  };
  return (
    <React.Fragment>
      <DenseHeader text="Criar cardápio" to="/tools/adm-cardapios" />
      <Main>
        <Alert
          severity="error"
          style={{
            maxWidth: '300px',
            display: error ? 'flex' : 'none',
            textAlign: 'center',
            margin: 'auto',
          }}
        >
          <AlertTitle>{errorMessage}</AlertTitle>
        </Alert>
        <Alert
          severity="success"
          style={{
            maxWidth: '300px',
            display: success ? 'flex' : 'none',
            textAlign: 'center',
            margin: 'auto',
          }}
        >
          <AlertTitle>{successMessage}</AlertTitle>
        </Alert>
        <Card>
          <form
            style={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'left',
              justifyContent: 'center',
              gap: '20px',
            }}
          >
            <div
              className="inputs"
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <FormControl variant="standard" sx={{ m: 1, minWidth: '30ch' }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Dia da semana:
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={weekDay}
                  onChange={(e) => setWeekDay(e.target.value)}
                  label="Dia"
                >
                  <MenuItem value={'Domingo'}>Domingo</MenuItem>
                  <MenuItem value={'Segunda-feira'}>Segunda-feira</MenuItem>
                  <MenuItem value={'Terça-feira'}>Terça-feira</MenuItem>
                  <MenuItem value={'Quarta-feira'}>Quarta-feira</MenuItem>
                  <MenuItem value={'Quinta-feira'}>Quinta-feira</MenuItem>
                  <MenuItem value={'Sexta-feira'}>Sexta-feira</MenuItem>
                  <MenuItem value={'Sábado'}>Sábado</MenuItem>
                </Select>
              </FormControl>

              <FormControl variant="standard" sx={{ m: 1, minWidth: '30ch' }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Válido para as semanas:
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label-weekNum"
                  id="demo-simple-select-standard-weekNumId"
                  value={weekNum}
                  onChange={(e) => {
                    if (typeof e.target.value === 'number') {
                      setWeekNum(e.target.value);
                    }
                  }}
                  label="Dia"
                >
                  <MenuItem value={1}>Semanas 1 e 3</MenuItem>
                  <MenuItem value={0}>Semanas 2 e 4</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: '30ch' }}>
                <TextField
                  type="text"
                  id="snack-basic"
                  label="Merenda da manhã"
                  variant="standard"
                  placeholder="Pão com ovo + café/leite"
                  value={snack}
                  onChange={(e) => setSnack(e.target.value)}
                />
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: '30ch' }}>
                <TextField
                  type="text"
                  id="lunch-basic"
                  label="Almoço"
                  variant="standard"
                  placeholder="Arroz + feijão + Farofa + Frango"
                  value={lunch}
                  onChange={(e) => setLunch(e.target.value)}
                />
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: '30ch' }}>
                <TextField
                  type="text"
                  id="afternoonsnack-basic"
                  label="Merenda da tarde"
                  variant="standard"
                  placeholder="Bolo + café"
                  value={afternoonSnack}
                  onChange={(e) => setAfternoonSnack(e.target.value)}
                />
              </FormControl>
            </div>
            <ContainedButton
              textButton="Criar Cardápio"
              onClick={(e) => handleSubmit(e)}
            />
          </form>
        </Card>
      </Main>
    </React.Fragment>
  );
}

export default CriarCardapios;
