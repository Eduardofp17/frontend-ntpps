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
} from '@mui/material';
import ContainedButton from '../../../components/buttons/contained';
import axios from '../../../services/axios';
import { School } from '../../../store/globalTypes';

const FormSchema = z.object({
  fullName: z.string().nonempty('Seu nome completo é obrigatório'),
  email: z.string().nonempty('Seu email é obrigatório').email('Email inválido'),
  instituicao: z.string().nonempty('Selecione a sua instituição'),
  feedback: z
    .string()
    .nonempty('Seu feedback precisa ter ao menos 15 caracteres')
    .min(15, 'Seu feedback precisa ter ao menos 15 caracteres'),
});
function CardapioFeedback(): JSX.Element {
  const [output, setOutput] = useState('');
  const [schools, setSchools] = useState<School[]>([]);
  const [selectValue, setSelectValue] = useState('');
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
      setOutput(JSON.stringify(data));
      const instituicao = schools.find((school) => school.email === data.email);
      await axios.post('/email/', {
        email: data.instituicao,
        subject: 'Feedback sobre a alimentação',
        html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Feedback</title>
          <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
          </head>
          <body>
        <main style="color: #000; font-family: 'Roboto', sans-serif; padding: 10px 20px; margin: auto">
         <div class="Header" style="width: 100%; text-align: left; margin: auto">

           <h2 style="color: #000"> Saudações, ${instituicao?.name}. Esta é uma mensangem repassando o feedback de um usuário. </h2>
           <h3 style="color: #000"> Informações do remetente abaixo:  </h3>
           <div class="card-remetente-info" style="flex-wrap: wrap; width: 100%; background-color: #fbfbfb; margin: auto; padding: 5px 10px; border-radius: 5px; color: #000">
             <p style=" font-weight: bold"> Nome completo do remetente: <span style="text-align: justify; padding-left: 10px; font-weight: normal"> ${data.fullName} <span/> </p>

          <p style=" font-weight: bold"> Email do remetente: <span style="text-align: justify; padding-left: 10px; font-weight: normal"> ${data.email} <span/> </p>

             <p style="font-weight: bold"> Feedback do remetente: <span style="text-align: justify; padding-left: 10px; font-weight: normal"> ${data.feedback} <span/> </p>
          </p>
           </div>
           </div>
        </main>
          </body>
        </html>
        `,
      });
    } catch (e) {}
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
      <main style={{ display: 'flex', flexDirection: 'column' }}>
        <h2>Envie seu feedback para sua instituição</h2>
        <p style={{ maxWidth: '90%', margin: 'auto', marginBottom: '20px' }}>
          Após preencher os campos e clicar em &quot;ENVIAR FEEDBACK&quot;,
          enviaremos seu feedback para a instuição selecionada
        </p>
        <form
          style={{ width: '80%', margin: 'auto' }}
          onSubmit={handleSubmit(SendFeedback)}
        >
          <FormControl sx={{ m: 1, width: '95%' }}>
            <TextField
              type="text"
              id="name-basic"
              label="Nome Completo*"
              variant="outlined"
              {...register('fullName')}
              error={Boolean(errors.fullName)}
              helperText={
                errors.fullName ? String(errors.fullName?.message) : ''
              }
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: '95%' }}>
            <TextField
              type="email"
              id="email-basic"
              label="Seu email*"
              variant="outlined"
              {...register('email')}
              error={Boolean(errors.email)}
              helperText={errors.email ? String(errors.email?.message) : ''}
            />
          </FormControl>
          <FormControl variant="outlined" sx={{ m: 1, minWidth: '95%' }}>
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
              style={{ textAlign: 'left', fontSize: '14px', width: '76vw' }}
              {...register('instituicao')}
              error={Boolean(errors.instituicao)}
              value={selectValue}
              onChange={(e) => setSelectValue(e.target.value)}
            >
              {schools.map((school) =>
                school.id !== 20 ? (
                  <MenuItem
                    value={school.email}
                    key={school.id}
                    style={{
                      textAlign: 'left',
                      fontSize: '12px',
                      maxWidth: '274px',
                      padding: '5px',
                    }}
                  >
                    {school.name}
                  </MenuItem>
                ) : (
                  ''
                ),
              )}
            </Select>
          </FormControl>
          <FormControl variant="outlined" sx={{ m: 1, width: '95%' }}>
            <TextareaAutosize
              aria-label="empty textarea"
              style={{ width: '100%' }}
              placeholder={'Seu feedback precisa ter ao menos 15 caracteres'}
              {...register('feedback')}
            />
          </FormControl>
          <div className="buttonSubmit" style={{ marginTop: '20px' }}>
            <ContainedButton textButton="Enviar feedback" width="100%" />
          </div>
        </form>
      </main>
    </>
  );
}

export default CardapioFeedback;
