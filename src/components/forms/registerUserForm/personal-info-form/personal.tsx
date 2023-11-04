import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
} from '@mui/material';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { primaryGreen } from '../../../../config/collors/colors';
import { SelectChangeEvent } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ptBR } from '@mui/x-date-pickers/locales/ptBR';
import { PersonalInfo } from '../form';
import 'dayjs/locale/pt-br';
import dayjs from 'dayjs';
dayjs.locale('pt-br');
interface Props {
  onNext: () => void;
  onPersonalInfoChange: React.Dispatch<React.SetStateAction<PersonalInfo>>;
  personalInfo: {
    name: string;
    lastname: string;
    isMale: boolean;
    birthday: string;
  };
}

export function PersonalUserInfo(props: Props): JSX.Element {
  const [birthday, setBirthday] = useState<string>(props.personalInfo.birthday);
  const [lastValidDate, setLastValidDate] = useState<string>('');
  const [sex, setSex] = useState<string>(
    props.personalInfo.isMale ? 'male' : 'female',
  );
  const { onNext, onPersonalInfoChange, personalInfo } = props;
  const [name, setName] = useState<string>(personalInfo.name);
  const [lastname, setLastName] = useState<string>(personalInfo.lastname);
  const [nameError, setNameError] = useState<boolean>(false);
  const [nameErrorMessage, setNameErrorMessage] = useState<string>('');
  const [lastNameError, setLastNameError] = useState<boolean>(false);
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState<string>('');
  const [dateError, setDateError] = useState<boolean>(false);
  const [dateErrorMessage, setDateErrorMessage] = useState<string>('');
  const handleNextClick = () => {
    onNext();
  };

  //Validation functions

  const isValidName = (): boolean => {
    if (name.length < 3) {
      setNameErrorMessage('O nome deve ter no mínimo 3 caracteres');
      setNameError(true);
      return false;
    }
    setNameError(false);
    setNameErrorMessage('');
    return true;
  };

  useEffect(() => {
    isValidName();
  }, [name]);

  const isValidLastName = (): boolean => {
    if (lastname.length < 3) {
      setLastNameErrorMessage('O sobrenome deve ter no mínimo 3 caracteres');
      setLastNameError(true);
      return false;
    }

    setLastNameError(false);
    setLastNameErrorMessage('');
    return true;
  };
  useEffect(() => {
    isValidLastName();
  }, [lastname]);

  useEffect(() => {
    isValidDate();
  }, [birthday]);
  useEffect(() => {
    setNameError(false);
    setLastNameError(false);
    setDateError(false);
  }, []);
  const isValidDate = (): boolean => {
    if (!birthday) {
      setDateErrorMessage('A data de nascimento é um campo obrigatório');
      setDateError(true);
      return false;
    }

    setDateError(false);
    setDateErrorMessage('');
    return true;
  };

  //On change functions
  const handleNameChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    onPersonalInfoChange({ ...personalInfo, name: event.target.value });
    setName(event.target.value);
  };

  const handleLastNameChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    onPersonalInfoChange({ ...personalInfo, lastname: event.target.value });
    setLastName(event.target.value);
  };
  const handleBirthdayChange = (date: dayjs.Dayjs | null) => {
    if (date !== null) {
      const formattedDate = date.toISOString();
      setBirthday(String(formattedDate));
      onPersonalInfoChange({
        ...personalInfo,
        birthday: String(formattedDate),
      });
    }
  };

  const handleSexChange = (event: SelectChangeEvent<string>) => {
    const isMale = event.target.value === 'male' ? true : false;
    setSex(event.target.value);
    onPersonalInfoChange({ ...personalInfo, isMale });
  };

  const handleSubmit = () => {
    if (!isValidName() || !isValidLastName()) {
      return;
    }

    handleNextClick();
  };
  return (
    <>
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
          type="text"
          id="name-basic"
          label="Nome"
          variant="outlined"
          placeholder="João"
          style={{ border: 'none' }}
          value={name}
          required
          size="small"
          onChange={(e) => handleNameChange(e)}
          helperText={nameError ? nameErrorMessage : ''}
          error={nameError}
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
      >
        <TextField
          type="text"
          id="lastname-basic"
          value={lastname}
          label="Sobrenome"
          variant="outlined"
          placeholder="João"
          style={{ border: 'none' }}
          required
          size="small"
          onChange={(e) => handleLastNameChange(e)}
          helperText={lastNameError ? lastNameErrorMessage : ''}
          error={lastNameError}
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
      >
        <InputLabel
          id="demo-simple-select-label"
          htmlFor="demo-simple-select"
          size="small"
          required
        >
          Sexo
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Sexo"
          size="small"
          value={sex}
          onChange={(e) => handleSexChange(e)}
          sx={{ textAlign: 'left' }}
          required
        >
          <MenuItem value={'male'}>Masculino</MenuItem>
          <MenuItem value={'female'}>Feminino</MenuItem>
        </Select>
      </FormControl>

      <FormControl
        sx={{
          m: 1,
          width: '95%',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale="pt-br"
          localeText={
            ptBR.components.MuiLocalizationProvider.defaultProps.localeText
          }
        >
          <DatePicker
            format="DD [de] MMMM [de] YYYY"
            defaultValue={
              birthday ? dayjs(new Date(birthday)) : dayjs(new Date())
            }
            onChange={(e) => {
              if (e !== null) {
                handleBirthdayChange(e);
              }
            }}
          />
        </LocalizationProvider>
      </FormControl>

      <Button
        variant="contained"
        size="small"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '15px',
          gap: '10px',
          margin: '10px 5px',
          backgroundColor: primaryGreen,
          ':hover': {
            backgroundColor: primaryGreen,
          },
        }}
        onClick={handleSubmit}
      >
        próximo <AiOutlineArrowRight />
      </Button>
    </>
  );
}
