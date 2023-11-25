import DenseHeader from '../../../components/headers/dense';
import { NewRoom } from '../../../store/globalTypes';
import axios from '../../../services/axios';
import { useEffect, useState } from 'react';
import { Main } from './styled';
import { States, Student } from '../../../store/globalTypes';
import { useSelector } from 'react-redux';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Footer from '../../../components/footer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import CardRoomFrequency from '../../../components/CardRoomFrequency/card';

export function ViewFrequencias(): JSX.Element {
  const [rooms, setRooms] = useState<NewRoom[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const getData = async () => {
    try {
      const response = await axios.get('/room/');
      setRooms(response.data);
    } catch (e) {
      //
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <DenseHeader text="Visualizar frequências" />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading ? true : false}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Main style={{ paddingBottom: '20px' }}>
        {rooms.length === 0 ? (
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
              Salas cadastradas: {rooms.length}
            </h3>

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
              {rooms.map((room) => (
                <CardRoomFrequency
                  key={room.id + 1}
                  room_id={Number(room.id)}
                  room_name={String(room.name)}
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
