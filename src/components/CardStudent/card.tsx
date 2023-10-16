import { useState, useEffect } from 'react';
import { User, Paragraph } from './styled';
import { TextField } from '@mui/material';
import { TbEdit } from 'react-icons/tb';
import { IconButton } from '@mui/material';
import { primaryOrange } from '../../config/collors/colors';
import { Close } from '@mui/icons-material';
import { Done } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import { UpdateStudentRequest } from '../../store/modules/Update-student/index';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { States } from '../../store/globalTypes';
import { errorResponses } from '../../translate/errors';

interface Props {
  fullName: string;
  id: number;
  room_id: number;
}

function CardStudent(props: Props): JSX.Element {
  const [name, setName] = useState<string>(props.fullName);
  const [editing, setEditing] = useState<boolean>(false);
  const [nameErrorMessage, setNameErrorMessage] = useState<string>('');
  const [nameError, setNameError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const loadingStudent = useSelector(
    (state: States): boolean => state.updateStudentReducer.loading,
  );
  const idState = useSelector(
    (state: States): number => state.updateStudentReducer.id,
  );
  const erroState = useSelector(
    (state: States): boolean => state.updateStudentReducer.error,
  );
  const errorMessageState = useSelector(
    (state: States): string => state.updateStudentReducer.errorMessage,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if ((name.length > 0 && name.length < 3) || name.length === 0) {
      setNameErrorMessage('O nome do aluno deve ter ao menos 3 caracteres');
      setNameError(true);
    }
    if (name.length >= 3) {
      setNameError(false);
      setNameErrorMessage('');
    }
    if (name.length > 60) {
      setNameErrorMessage('O nome do aluno deve ter no máximo 60 caracteres');
      setNameError(true);
    }
  }, [name]);

  const handleEditing = () => {
    if (!editing) {
      setEditing(true);
      return;
    }
    if (editing && name.length === 0) {
      setEditing(false);
      setName(props.fullName);
      return;
    }
    if (editing && !nameError) {
      setEditing(false);
      return;
    }
  };
  useEffect(() => {
    setLoading(loadingStudent);
  }, [loadingStudent]);
  const handleSaveUpdate = async () => {
    try {
      if (!props.id) {
        toast.error('Está faltando o Id do aluno.', {
          toastId: 'unique-toast-id',
        });
        return;
      }
      if (nameError && name.length === 0) {
        toast.error('O nome do aluno deve ter ao menos 3 caracteres.', {
          toastId: 'unique-toast-id',
        });
        return;
      }
      if (nameError && name.length > 60) {
        toast.error('O nome do aluno deve ter no máximo 60 caracteres.', {
          toastId: 'unique-toast-id',
        });
        return;
      }
      if (name === props.fullName) return;
      handleEditing();
      dispatch(UpdateStudentRequest({ id: props.id, name: name }));
    } catch (e) {
      handleEditing();
      setName(props.fullName);
      toast.error('INTERNAL SERVER ERROR', {
        toastId: 'unique-toast-id',
      });
      setLoading(false);
    }
  };
  const handleDiscard = () => {
    setName(props.fullName);
    setEditing(false);
  };
  useEffect(() => {
    if (erroState) {
      setName(props.fullName);
      if (errorMessageState in errorResponses) {
        const translatedErrorMessage = errorResponses[errorMessageState];
        toast.error(translatedErrorMessage, {
          toastId: 'unique-toast-id',
          autoClose: 700,
          style: { width: '90%', maxWidth: '320px', margin: 'auto' },
        });
      } else {
        toast.error('INTERNAL SERVER ERROR', {
          toastId: 'unique-toast-id',
        });
      }
    }
  }, [erroState]);
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          margin: 'auto',
          backgroundColor: '#fff',
          boxShadow: '0px 4px 10px rgba(11, 11, 11, 0.1)',
          width: '90%',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 10px',
          gap: '5px',
        }}
      >
        {' '}
        <User>
          {editing ? (
            <TextField
              id="standard-basic"
              label="Nome do aluno"
              variant="standard"
              value={name}
              onChange={(e) => setName(e.target.value.toUpperCase())}
              helperText={nameError ? nameErrorMessage : ''}
              error={nameError}
            />
          ) : (
            <Paragraph>{name}</Paragraph>
          )}
        </User>
        <div>
          {loading && idState === props.id ? (
            <CircularProgress style={{ width: '20px', height: '20px' }} />
          ) : editing ? (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <IconButton onClick={() => handleSaveUpdate()}>
                <Done style={{ color: 'green', fontSize: '30px' }} />
              </IconButton>
              <IconButton onClick={() => handleDiscard()}>
                <Close style={{ color: 'red', fontSize: '30px' }} />
              </IconButton>
            </div>
          ) : (
            <IconButton onClick={() => handleEditing()}>
              <TbEdit style={{ color: primaryOrange }} />
            </IconButton>
          )}
        </div>
      </div>
    </>
  );
}

export default CardStudent;
