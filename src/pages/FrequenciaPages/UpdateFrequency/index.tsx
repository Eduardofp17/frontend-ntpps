import { useEffect, useState } from 'react';
import DenseHeader from '../../../components/headers/dense';
import CardStudentFrequency from '../../../components/CardStudentFrequency/card';
import axios from '../../../services/axios';
import { Main } from './styled';
import { States, Student } from '../../../store/globalTypes';
import { useSelector } from 'react-redux';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Footer from '../../../components/footer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './managa-students.css';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import { frequency } from '../../../store/globalTypes';
import { errorResponses } from '../../../translate/errors';

function formatLastUpdatedDate(updatedAt: Date) {
  const currentDate = new Date();
  const updatedDate = new Date(updatedAt);

  if (isSameDay(currentDate, updatedDate)) {
    // Data é hoje
    const hours = updatedDate.getHours();
    const minutes = updatedDate.getMinutes();
    return `hoje às ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  } else if (isYesterday(currentDate, updatedDate)) {
    // Data é ontem
    const hours = updatedDate.getHours();
    const minutes = updatedDate.getMinutes();
    return `ontem às ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  } else {
    // Outra data
    const formattedDate = new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'America/Sao_Paulo',
    }).format(updatedDate);
    return `em ${formattedDate}`;
  }
}

function isSameDay(date1: Date, date2: Date) {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}

function isYesterday(date1: Date, date2: Date) {
  const yesterday = new Date(date1);
  yesterday.setDate(yesterday.getDate() - 1);

  return (
    yesterday.getDate() === date2.getDate() &&
    yesterday.getMonth() === date2.getMonth() &&
    yesterday.getFullYear() === date2.getFullYear()
  );
}

function UpdateFrequency(): JSX.Element {
  document.title = 'Atualizar frequência';
  const [students, setStudents] = useState<Student[]>([]);
  const [frequencies, setFrequencys] = useState<frequency[]>([]);
  const [lastUpdatedBy, setLastUpdatedBy] = useState<string>('');
  const [lastUpdatedAt, setLastUpdatedAt] = useState<string>('');
  const loadingUpdateFrequencyState = useSelector(
    (state: States): boolean => state.updateFrequencyReducer.loading,
  );
  const successState = useSelector(
    (state: States): boolean => state.updateFrequencyReducer.updated,
  );
  const errorState = useSelector(
    (state: States): boolean => state.updateFrequencyReducer.error,
  );
  const errorMessageState = useSelector(
    (state: States): string => state.updateFrequencyReducer.errorMessage,
  );
  const roomId = useSelector((state: States) => state.authReducer.room_id);
  const roomName = useSelector((state: States) => state.authReducer.room_name);
  const [loading, setLoading] = useState<boolean>(loadingUpdateFrequencyState);

  const getPupils = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/student`);
      const frequenciaToday = await axios.get(`/frequencia/only-today/`);
      const frequenciaAll = await axios.get(
        `/frequencia/list-room-frequencies/${roomId}`,
      );
      if (frequenciaToday.data.length > 0) {
        setFrequencys(frequenciaToday.data);
      }
      if (frequenciaAll.data.length > 0) {
        if (frequenciaAll.data) {
          frequenciaAll.data.sort((a: frequency, b: frequency) => {
            const dateA = new Date(a.updated_at).getTime();
            const dateB = new Date(b.updated_at).getTime();
            return dateB - dateA;
          });
          const date = new Date(frequenciaAll.data[0].updated_at);
          setLastUpdatedBy(frequenciaAll.data[0].updated_by);
          setLastUpdatedAt(formatLastUpdatedDate(date));
        }
      }
      setStudents(data);
      setLoading(false);
    } catch (e) {
      //
    }
  };

  useEffect(() => {
    setLoading(loadingUpdateFrequencyState);
    getPupils();
  }, [loadingUpdateFrequencyState]);

  useEffect(() => {
    if (successState) {
      toast.success('Frequência atualizada com sucesso!', {
        toastId: 'unique-toast-id',
        autoClose: 700,
        style: { width: '90%', maxWidth: '320px', margin: 'auto' },
      });
    }
  }, [successState]);
  useEffect(() => {
    if (errorState) {
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
  }, [errorState]);

  students.sort((a, b) => {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  });
  return (
    <>
      <DenseHeader text="Atualizar frequência" />
      <ToastContainer
        position="top-right"
        autoClose={700}
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
      <Main style={{ paddingBottom: '20px' }}>
        {students.length === 0 ? (
          <div style={{ margin: 'auto', textAlign: 'center', padding: ' ' }}>
            <div>
              <h2>Sem alunos vinculados à sua sala</h2>
              <p>
                Parece que ainda não existem alunos vinculados à sua sala. Você
                pode{' '}
                <a href="/tools/frequencia/administrar-alunos-de-sua-sala">
                  adicionar alunos à sua sala
                </a>{' '}
                agora.
              </p>
            </div>
          </div>
        ) : (
          <section>
            <h3 style={{ padding: '0px 25px' }}>
              Alunos do {roomName}: {students.length}{' '}
            </h3>
            <h5 style={{ fontWeight: 'normal', padding: '0px 10px' }}>
              Atualizado por último {lastUpdatedAt}, por{' '}
              <strong>{lastUpdatedBy}</strong>
            </h5>
            <Alert severity="info" style={{ margin: '10px' }}>
              Atualizações de frequência somente estão disponíveis durante o
              período das <strong>07:00</strong> às <strong>17:00</strong>.
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
                <CardStudentFrequency
                  fullName={String(student.name)}
                  key={Number(student.id)}
                  id={Number(student.id)}
                  room_id={Number(student.room_id)}
                  frequency={frequencies.find(
                    (frequency) => frequency.student_id === student.id,
                  )}
                />
              ))}
            </div>
          </section>
        )}
      </Main>
      <Footer />
    </>
  );
}

export default UpdateFrequency;
