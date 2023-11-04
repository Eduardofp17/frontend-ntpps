import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
  Radio,
  FormControlLabel,
  RadioGroup,
  ButtonGroup,
  Chip,
  Box,
  FormHelperText,
} from '@mui/material';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { primaryGreen } from '../../../../config/collors/colors';
import { InstituitionData } from '../form';
import { ChangeEvent } from 'react';
import { validCNPJ } from '../../../../utils/valid-cnpj';
import { SelectChangeEvent } from '@mui/material';

interface Props {
  onNext: () => void;
  onInstituitionDataInfoChange: React.Dispatch<
    React.SetStateAction<InstituitionData>
  >;
  instituitionDataInfo: InstituitionData;
}

const valueToNameMap: { [key: string]: string } = {
  fundamental_I: 'Ensino Fundamental I',
  fundamental_II: 'Ensino Fundamental II',
  medio: 'Ensino médio',
  EJA: 'Ensino de Jovens e Adultos (EJA)',
};

export function InstituitionDataInfo(props: Props): JSX.Element {
  const { instituitionDataInfo, onNext, onInstituitionDataInfoChange } = props;
  const [name, setName] = useState<string>(
    instituitionDataInfo.instituition_name,
  );
  const [nameError, setNameError] = useState<boolean>(false);
  const [nameErrorMessage, setNameErrorMessage] = useState<string>('');

  const [cnpj, setCnpj] = useState<string>(instituitionDataInfo.cnpj);
  const [cnpjError, setCnpjError] = useState<boolean>(false);
  const [cnpjErrorMessage, setCnpjErrorMessage] = useState<string>('');

  const [instituitionModality, setInstituitionModality] = useState<string>(
    instituitionDataInfo.school_modality,
  );
  const [formsOfEducation, setFormsOfEducation] = useState<string[]>(
    instituitionDataInfo.forms_of_education,
  );

  const [formsOfEducationError, setFormsOfEducationError] =
    useState<boolean>(false);
  const [formsOfEducationErrorMessage, setFormsOfEducationErrorMessage] =
    useState<string>('');

  const [isPublic, setIsPublic] = useState<boolean>(
    instituitionDataInfo.isPublic,
  );
  const handleNextClick = () => {
    onNext();
  };

  //Validation functions
  const isValidCnpj = (): boolean => {
    if (cnpj.length === 0) {
      setCnpjErrorMessage('O CNPJ é um campo obrigatório');
      setCnpjError(true);
      return false;
    }
    if (!validCNPJ(cnpj)) {
      setCnpjErrorMessage('CNPJ inválido');
      setCnpjError(true);
      return false;
    }
    setCnpjError(false);
    setCnpjErrorMessage('');
    return true;
  };

  const isValidName = (): boolean => {
    if (name.length === 0) {
      setNameErrorMessage('O nome da instituição é um campo obrigatório');
      setNameError(true);
      return false;
    }

    if (name.length < 3) {
      setNameErrorMessage(
        'O nome da instituição deve ter ao menos 3 caracteres',
      );
      setNameError(true);
      return false;
    }
    setNameError(false);
    setNameErrorMessage('');
    return true;
  };

  const isValidFormOfEducation = (): boolean => {
    if (formsOfEducation.length === 0) {
      setFormsOfEducationErrorMessage(
        'Você deve selecionar ao menos 1 tipo de ensino',
      );
      setFormsOfEducationError(true);
      return false;
    }
    setFormsOfEducationError(false);
    setFormsOfEducationErrorMessage('');
    return true;
  };
  //onChangeFunctions

  const handleCnpjChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    let inputValue = e.target.value.replace(/\D/g, '');

    if (inputValue.length > 14) {
      inputValue = inputValue.slice(0, 14);
    }

    e.target.value = formatCnpj(inputValue);
    setCnpj(e.target.value);
    onInstituitionDataInfoChange({
      ...instituitionDataInfo,
      cnpj: e.target.value,
    });
  };

  const formatCnpj = (cnpj: string) => {
    return cnpj
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2');
  };

  const handleNameChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setName(e.target.value);
    onInstituitionDataInfoChange({
      ...instituitionDataInfo,
      instituition_name: e.target.value,
    });
  };

  const handleSchoolModalityChange = (event: SelectChangeEvent<string>) => {
    setInstituitionModality(event.target.value);
    onInstituitionDataInfoChange({
      ...instituitionDataInfo,
      school_modality: event.target.value,
    });
  };
  const handleFormsOfEducationChange = (
    event: SelectChangeEvent<typeof formsOfEducation>,
  ) => {
    const {
      target: { value },
    } = event;
    setFormsOfEducation(typeof value === 'string' ? value.split(',') : value);
    onInstituitionDataInfoChange({
      ...instituitionDataInfo,
      forms_of_education: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const handleInsitituitionNatureChange = (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.value === 'public') {
      setIsPublic(true);
    } else {
      setIsPublic(false);
    }
    onInstituitionDataInfoChange({
      ...instituitionDataInfo,
      isPublic: e.target.value === 'public' ? true : false,
    });
  };
  //Effect Functions
  useEffect(() => {
    isValidCnpj();
  }, [cnpj]);

  useEffect(() => {
    isValidName();
  }, [name]);
  useEffect(() => {
    isValidFormOfEducation();
  }, [formsOfEducation]);
  useEffect(() => {
    setCnpjError(false);
    setCnpjErrorMessage('');
    setNameError(false);
    setNameErrorMessage('');
    setFormsOfEducationError(false);
    setFormsOfEducationErrorMessage('');
  }, []);

  //Submit function
  const handleSubmit = () => {
    if (!isValidName() || !isValidCnpj() || !isValidFormOfEducation()) {
      return;
    }
    handleNextClick();
  };
  return (
    <>
      {' '}
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
          label="Nome da instituição"
          variant="outlined"
          value={name}
          placeholder="E.E.M.T.I Dep. Joaquim de Figueiredo Correia"
          style={{ border: 'none' }}
          onChange={(e) => handleNameChange(e)}
          required
          size="small"
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
          id="cnpj-basic"
          label="CNPJ da instituição"
          variant="outlined"
          placeholder="99.999.999/9999-99"
          value={cnpj}
          onChange={(e) => handleCnpjChange(e)}
          style={{ border: 'none' }}
          required
          autoComplete="cnpj"
          size="small"
          helperText={cnpjError ? cnpjErrorMessage : ''}
          error={cnpjError}
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
          id="demo-simple-select-label-modalidade"
          htmlFor="demo-simple-select-modalidade"
          size="small"
          required
        >
          Modalidade da instituição
        </InputLabel>
        <Select
          labelId="demo-simple-select-label-modalidade"
          id="demo-simple-select-modalidade"
          label="Modalidade da instituição"
          size="small"
          sx={{ textAlign: 'left' }}
          value={instituitionModality}
          onChange={(e) => handleSchoolModalityChange(e)}
          required
        >
          <MenuItem value={'regular'}>Regular</MenuItem>
          <MenuItem value={'integral'}>Integral</MenuItem>
          <MenuItem value={'professional'}>Profissional</MenuItem>
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
        <InputLabel
          id="demo-simple-select-label-types"
          htmlFor="demo-simple-select-types"
          size="small"
          error={formsOfEducationError}
          required
        >
          Tipos de Ensino (Selecione Todos os Aplicáveis)
        </InputLabel>
        <Select
          labelId="demo-simple-select-label-types"
          id="demo-simple-select-types"
          label="Tipos de Ensino (Selecione Todos os Aplicáveis)"
          size="small"
          value={formsOfEducation}
          onChange={(e) => handleFormsOfEducationChange(e)}
          sx={{ textAlign: 'left' }}
          required
          multiple
          error={formsOfEducationError}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={valueToNameMap[String(value)]} />
              ))}
            </Box>
          )}
        >
          <MenuItem value={'fundamental_I'}>Ensino Fundamental I</MenuItem>
          <MenuItem value={'fundamental_II'}>Ensino Fundamental II</MenuItem>
          <MenuItem value={'medio'}>Ensino médio</MenuItem>
          <MenuItem value={'EJA'}>Ensino de Jovens e Adultos (EJA)</MenuItem>
        </Select>
        <FormHelperText
          error={formsOfEducationError}
          style={{
            marginTop: '-8px',
            display: formsOfEducationError ? 'flex' : 'none',
          }}
        >
          {formsOfEducationErrorMessage}
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
      >
        <p style={{ margin: 0, textAlign: 'left', fontWeight: 'bold' }}>
          Natureza da Instituição :{' '}
        </p>
        <ButtonGroup
          variant="contained"
          aria-label="Disabled elevation buttons"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            background: 'none',
            boxShadow: 'none',
            margin: 0,
            marginTop: '-15px',
          }}
        >
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            sx={{ display: 'flex', flexDirection: 'row' }}
            value={isPublic ? 'public' : 'private'}
            onChange={(e) => {
              handleInsitituitionNatureChange(e);
            }}
          >
            <FormControlLabel
              value="public"
              control={<Radio />}
              label="Pública"
            />
            <FormControlLabel
              value="private"
              control={<Radio />}
              label="Privada"
            />
          </RadioGroup>
        </ButtonGroup>
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
