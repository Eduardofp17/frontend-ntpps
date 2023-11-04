import { useEffect, useState } from 'react';
import { TextField, FormControl, Button } from '@mui/material';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { primaryGreen } from '../../../../config/collors/colors';
import { MdDone } from 'react-icons/md';
import { InstituitionInfo as InstituitionData } from '../form';
interface Props {
  onNext: () => void;
  onLast: () => void;
  onInstituitionInfoChange: React.Dispatch<
    React.SetStateAction<InstituitionData>
  >;
  instituitionInfo: InstituitionData;
}

export function InstituitionInfo(props: Props): JSX.Element {
  const { onNext, instituitionInfo, onInstituitionInfoChange, onLast } = props;
  const [code, setCode] = useState<string>(instituitionInfo.code);
  const [codeError, setCodeError] = useState<boolean>(false);
  const [codeErrorMessage, setCodeErrorMessage] = useState<string>('');

  //validation functions
  const isValidCode = (): boolean => {
    if (code.length === 0 || code.length < 11) {
      setCodeErrorMessage(
        'O código da instituição é um campo obrigatório e deve ter pelo menos 11 caracteres',
      );
      setCodeError(true);
      return false;
    }

    setCodeError(false);
    setCodeErrorMessage('');
    return true;
  };
  useEffect(() => {
    isValidCode();
  }, [code]);
  useEffect(() => {
    setCodeError(false);
    setCodeErrorMessage('');
  }, []);

  //onChange functions
  const handleCodeChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    let newCode = event.target.value.substring(0, 11);

    if (!newCode.startsWith('#') && newCode !== '') {
      newCode = `#${newCode}`;
    }

    setCode(newCode);
    onInstituitionInfoChange({ code: event.target.value });
  };

  //click functions
  const handleNextClick = () => {
    if (!isValidCode()) {
      return;
    }
    onNext();
  };

  const handleLastClick = () => {
    onLast();
  };

  return (
    <>
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
            type="text"
            id="text-basic"
            label="Código da instituição"
            variant="outlined"
            value={code}
            style={{ border: 'none' }}
            required
            size="small"
            onChange={(e) => handleCodeChange(e)}
            helperText={codeError ? codeErrorMessage : ''}
            error={codeError}
          />
        </FormControl>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'center',
            marginTop: '20px',
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
      </form>
    </>
  );
}
