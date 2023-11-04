import { useEffect, useState } from 'react';
import {
  TextField,
  FormControl,
  Button,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormHelperText,
} from '@mui/material';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import { primaryGreen } from '../../../../config/collors/colors';
import { LocalizationData } from '../form';
import { states } from './localization-infos';
import { ChangeEvent } from 'react';

interface Props {
  onSubmit: () => void;
  onLast: () => void;
  onLocalizationInfoChange: React.Dispatch<
    React.SetStateAction<LocalizationData>
  >;
  localizationInfo: LocalizationData;
}

export function LocalizationInfo(props: Props): JSX.Element {
  const { onSubmit, localizationInfo, onLocalizationInfoChange, onLast } =
    props;
  const [state, setState] = useState<string>(localizationInfo.state);
  const [stateError, setStateError] = useState<boolean>(false);
  const [stateErrorMessage, setStateErrorMessage] = useState<string>('');
  const [city, setCity] = useState<string>(localizationInfo.city);
  const [cityError, setCityError] = useState<boolean>(false);
  const [cityErrorMessage, setCityErrorMessage] = useState<string>('');
  const [neighborhood, setNeighborhood] = useState<string>(
    localizationInfo.neighborhood,
  );
  const [neighborhoodError, setNeighborhoodError] = useState<boolean>(false);
  const [neighborhoodErrorMessage, setNeighborhoodErrorMessage] =
    useState<string>('');
  const [address, setAddress] = useState<string>(localizationInfo.address);
  const [addressError, setAddressError] = useState<boolean>(false);
  const [addressErrorMessage, setAddressErrorMessage] = useState<string>('');
  const [cep, setCep] = useState<string>(localizationInfo.cep);
  const [cepError, setCepError] = useState<boolean>(false);
  const [cepErrorMessage, setCepErrorMessage] = useState<string>('');

  //validationFunctions
  const isValidState = (): boolean => {
    if (state.length === 0) {
      setStateErrorMessage(
        'Você deve selecionar o Estado em que sua instituição se originou',
      );
      setStateError(true);
      return false;
    }
    setStateError(false);
    setStateErrorMessage('');

    return true;
  };

  const isValidCity = (): boolean => {
    if (city.length === 0) {
      setCityErrorMessage('A cidade é um campo obrigatório');
      setCityError(true);
      return false;
    }
    if (city.length < 3) {
      setCityErrorMessage('A cidade deve ter ao menos 3 caracteres');
      setCityError(true);
      return false;
    }
    setCityError(false);
    setCityErrorMessage('');
    return true;
  };

  const isValidNeighborhood = (): boolean => {
    if (neighborhood.length === 0) {
      setNeighborhoodErrorMessage('O bairro é um campo obrigatório');
      setNeighborhoodError(true);
      return false;
    }
    if (neighborhood.length < 3) {
      setNeighborhoodErrorMessage('O bairro deve ter ao menos 3 caracteres');
      setNeighborhoodError(true);
      return false;
    }
    setNeighborhoodError(false);
    setNeighborhoodErrorMessage('');
    return true;
  };

  const isValidAddress = (): boolean => {
    if (address.length === 0) {
      setAddressErrorMessage('O endereço é um campo obrigatório');
      setAddressError(true);
      return false;
    }
    if (address.length < 3) {
      setAddressErrorMessage('O endereço deve ter ao menos 3 caracteres');
      setAddressError(true);
      return false;
    }
    setAddressError(false);
    setAddressErrorMessage('');
    return true;
  };

  const isValidCep = (): boolean => {
    const cepRegex = /^\d{5}-\d{3}$/;
    if (cep.length === 0) {
      setCepErrorMessage('O CEP é um campo obrigatório');
      setCepError(true);
      return false;
    }
    if (!cepRegex.test(cep)) {
      setCepErrorMessage('CEP inválido');
      setCepError(true);
      return false;
    }

    setCepError(false);
    setCepErrorMessage('');
    return true;
  };

  //onChange functions
  const handleStateChange = (event: SelectChangeEvent<string>) => {
    setState(event.target.value);
    onLocalizationInfoChange({
      ...localizationInfo,
      state: event.target.value,
    });
  };
  const handleCityChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setCity(event.target.value);
    onLocalizationInfoChange({
      ...localizationInfo,
      city: event.target.value,
    });
  };
  const handleNeighborhoodChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setNeighborhood(event.target.value);
    onLocalizationInfoChange({
      ...localizationInfo,
      neighborhood: event.target.value,
    });
  };
  const handleAddressChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setAddress(event.target.value);
    onLocalizationInfoChange({
      ...localizationInfo,
      address: event.target.value,
    });
  };
  const handleCepChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    let inputValue = event.target.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

    if (inputValue.length > 8) {
      inputValue = inputValue.slice(0, 8); // Limita a 8 algarismos
    }

    const formattedCep = inputValue.replace(/(\d{5})(\d{3})/, '$1-$2'); // Formata o CEP

    setCep(formattedCep);
    onLocalizationInfoChange({
      ...localizationInfo,
      cep: formattedCep,
    });
  };
  //click functions
  const handleNextClick = () => {
    if (
      !isValidState() ||
      !isValidCity() ||
      !isValidNeighborhood() ||
      !isValidAddress() ||
      !isValidCep()
    ) {
      return;
    }
    onSubmit();
  };

  const handleLastClick = () => {
    onLast();
  };

  // useEffect functions
  useEffect(() => {
    isValidState();
  }, [state]);
  useEffect(() => {
    isValidCity();
  }, [city]);
  useEffect(() => {
    isValidNeighborhood();
  }, [neighborhood]);
  useEffect(() => {
    isValidAddress();
  }, [address]);
  useEffect(() => {
    isValidCep();
  }, [cep]);
  useEffect(() => {
    setStateError(false);
    setStateErrorMessage('');
    setCityError(false);
    setCityErrorMessage('');
    setAddressError(false);
    setAddressErrorMessage('');
    setNeighborhoodError(false);
    setNeighborhoodErrorMessage('');
    setCepError(false);
    setCepErrorMessage('');
  }, []);
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
        <InputLabel
          id="demo-simple-select-label-state"
          htmlFor="demo-simple-select-state"
          size="small"
          error={stateError}
          required
        >
          Estado
        </InputLabel>
        <Select
          labelId="demo-simple-select-label-state"
          id="demo-simple-select-state"
          label="Estado"
          size="small"
          sx={{ textAlign: 'left' }}
          value={state}
          onChange={(e) => handleStateChange(e)}
          required
          error={stateError}
          autoComplete="state"
        >
          {states.map((state) => (
            <MenuItem key={state.uf} value={state.value}>
              {state.name}, {state.uf}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText
          error={stateError}
          style={{
            marginTop: '-8px',
            display: stateError ? 'flex' : 'none',
          }}
        >
          {stateErrorMessage}
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
        <TextField
          type="text"
          id="city-basic"
          label="Cidade"
          variant="outlined"
          placeholder="Iracema"
          style={{ border: 'none' }}
          required
          value={city}
          onChange={(e) => handleCityChange(e)}
          error={cityError}
          helperText={cityError ? cityErrorMessage : ''}
          size="small"
          autoComplete="city"
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
          id="neighborhood-basic"
          label="Bairro"
          variant="outlined"
          placeholder="Centro"
          style={{ border: 'none' }}
          value={neighborhood}
          required
          onChange={(e) => handleNeighborhoodChange(e)}
          size="small"
          autoComplete="neighborhood"
          error={neighborhoodError}
          helperText={neighborhoodError ? neighborhoodErrorMessage : ''}
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
          id="adress-basic"
          label="Endereço"
          variant="outlined"
          placeholder="R. Principal"
          style={{ border: 'none' }}
          value={address}
          required
          onChange={(e) => handleAddressChange(e)}
          size="small"
          autoComplete="address"
          error={addressError}
          helperText={addressError ? addressErrorMessage : ''}
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
          id="cep-basic"
          label="CEP"
          variant="outlined"
          placeholder="99999-999"
          style={{ border: 'none' }}
          value={cep}
          required
          onChange={(e) => handleCepChange(e)}
          error={cepError}
          size="small"
          helperText={cepError ? cepErrorMessage : ''}
          autoComplete="cep"
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
          finalizar <MdDone />
        </Button>
      </div>
    </>
  );
}
