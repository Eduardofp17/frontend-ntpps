import { useEffect, useState } from 'react';
import DenseHeader from '../../../components/headers/dense';
import CardStudent from '../../../components/CardStudent/card';
import axios from '../../../services/axios';
import { Main } from './styled';
import { States, Student } from '../../../store/globalTypes';
import { useSelector } from 'react-redux';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Footer from '../../../components/footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './managa-students.css';
import { Button } from '@mui/material';
import { AiOutlinePlus } from 'react-icons/ai';
import { primaryGreen } from '../../../config/collors/colors';
import ModalToCreateStudent from '../../../components/Modals/ModalToCreateStudent';
import ModalWithTwoButtons from '../../../components/Modals/ModalButtons';
import { FormControl, TextField } from '@mui/material';
import { AxiosError } from 'axios';
import { errorResponses } from '../../../translate/errors';
import { Alert } from '@mui/material';
import { Divider } from '@mui/material';

function ManageStudents(): JSX.Element {
  document.title = 'Administrar alunos de sua sala';

  const [students, setStudents] = useState<Student[]>([]);
  const [newStudent, setNewStudent] = useState<string>('');
  const [nameErrorMessage, setNameErrorMessage] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const [nameError, setNameError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const updatedStudent = useSelector(
    (state: States): boolean => state.updateStudentReducer.updated,
  );
  const roomId = useSelector((state: States) => state.authReducer.room_id);
  const roomName = useSelector((state: States) => state.authReducer.room_name);

  const getUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/student`);
      setStudents(data);
      setLoading(false);
    } catch (e) {
      //
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  useEffect(() => {
    if (updatedStudent) {
      toast.success('O aluno teve seu nome atualizado com sucesso', {
        toastId: 'unique-toast-id',
      });
      getUsers();
    }
  }, [updatedStudent]);

  useEffect(() => {
    if (newStudent.length > 0 && newStudent.length < 3) {
      setNameErrorMessage('O nome do aluno deve ter ao menos 3 caracteres');
      setNameError(true);
    }
    if (newStudent.length == 0 || newStudent.length >= 3) {
      setNameError(false);
      setNameErrorMessage('');
    }
    if (newStudent.length > 60) {
      setNameErrorMessage('O nome do aluno deve ter no máximo 60 caracteres');
      setNameError(true);
    }
  }, [newStudent]);

  students.sort((a, b) => {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateStudent = async () => {
    try {
      setLoading(true);
      await axios.post('/student', { name: newStudent, room_id: roomId });
      closeModal();
      setIsConfirmModalOpen(false);
      setNewStudent('');
      getUsers();
      setLoading(false);

      toast.success('Aluno adicionado a sua sala', {
        toastId: 'unique-toast-id',
      });
    } catch (e) {
      closeModal();
      setIsConfirmModalOpen(false);
      setNewStudent('');
      setLoading(false);
      if (e instanceof AxiosError && e.response?.data?.msg) {
        const errorMessageKey = String(e.response.data.msg);

        if (errorMessageKey in errorResponses) {
          const translatedErrorMessage = errorResponses[errorMessageKey];
          toast.error(String(translatedErrorMessage), {
            toastId: 'unique-toast-id',
          });
        } else {
          toast.error('INTERNAL SERVER ERROR', {
            toastId: 'unique-toast-id',
          });
        }
      }
    }
  };
  return (
    <>
      <DenseHeader text="Administrar alunos de sua sala" />
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
      <ModalWithTwoButtons
        title={`Deseja adicionar "${
          newStudent.length > 40
            ? newStudent.substring(0, 40) + '...'
            : newStudent
        }" à sua sala?`}
        ModalOpen={isConfirmModalOpen}
        info='Ao clicar em "Confirmar", você estará realizando a ação de adicionar o(a) aluno(a) à sua sala.'
        button1={
          <Button
            className="ModalWithTwoButtons"
            style={{
              background: 'none',
              border: `1px solid  #9D0000`,
              color: '#9D0000',
              borderRadius: '5px ',
              fontSize: '15px',
              fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
              fontWeight: 700,
              textTransform: 'uppercase',
            }}
            onClick={() => {
              setIsConfirmModalOpen(false);
              setIsModalOpen(true);
            }}
          >
            Cancelar
          </Button>
        }
        button2={
          <Button
            className="ModalWithTwoButtons"
            style={{
              backgroundColor: 'green',
              color: '#fff',
              borderRadius: '5px ',
              fontSize: '15px',
              fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
              fontWeight: 700,
              textTransform: 'uppercase',
            }}
            onClick={() => handleCreateStudent()}
          >
            Adicionar
          </Button>
        }
      />
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
      <ModalToCreateStudent
        ModalOpen={isModalOpen}
        onClose={closeModal}
        input={
          <FormControl sx={{ m: 1, width: '95%' }}>
            <TextField
              type="text"
              id="name-basic"
              label="Nome completo do(a) aluno(a)"
              variant="standard"
              onChange={(e) => setNewStudent(e.target.value.toUpperCase())}
              value={newStudent}
              helperText={nameError ? nameErrorMessage : ''}
              error={nameError}
            />
          </FormControl>
        }
        button={
          <Button
            variant="outlined"
            color="success"
            sx={{
              color: '#00CA39',
              borderColor: primaryGreen,
              ':hover': { borderColor: primaryGreen },
            }}
            onClick={() => {
              setIsModalOpen(false);
              setIsConfirmModalOpen(true);
            }}
            disabled={nameError || newStudent.length == 0 ? true : false}
          >
            {' '}
            Adicionar aluno(a)
          </Button>
        }
      />{' '}
      <Main style={{ paddingBottom: '20px' }}>
        {students.length === 0 ? (
          <div style={{ margin: 'auto', textAlign: 'center', padding: '10px' }}>
            <h2>Sem alunos vinculados à sua sala</h2>
            <p>
              Parece que atualmente não há alunos vinculados à sua sala. Para
              adicionar alunos, clique no botão localizado no canto inferior
              direito.
            </p>
          </div>
        ) : (
          <section>
            <h3 style={{ padding: '0px 25px' }}>
              Alunos do {roomName}: {students.length}{' '}
            </h3>
            <Alert severity="info" style={{ margin: '10px' }}>
              Seja honesto ao alterar o nome de um aluno, pois seus superiores
              podem verificar isso, e ações inadequadas podem resultar em
              penalidades na instituição.
            </Alert>
            <Divider sx={{ margin: '20px 5px 20px 5px' }} />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                margin: 'auto',
                width: '100%',
              }}
            >
              {students.map((student) => (
                <CardStudent
                  fullName={String(student.name)}
                  key={Number(student.id)}
                  id={Number(student.id)}
                  room_id={Number(student.room_id)}
                />
              ))}
            </div>
          </section>
        )}
        <Button
          variant="outlined"
          color="success"
          style={{
            width: '25px',
            height: '65px',
            borderRadius: '50%',
            borderColor: primaryGreen,
            position: 'fixed',
            right: '5%',
            bottom: '5%',
            zIndex: 10,
          }}
          onClick={openModal}
        >
          {' '}
          <AiOutlinePlus
            style={{ fontSize: '35px', color: primaryGreen }}
          />{' '}
        </Button>
      </Main>
      <Footer />
    </>
  );
}

export default ManageStudents;
