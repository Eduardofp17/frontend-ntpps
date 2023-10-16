import { useState, useEffect } from 'react';
import DenseHeader from '../../../components/headers/dense';
import { Main } from './styled';
import TableComponent from '../../../components/tables/table';
import { Room as Class } from '../../../store/globalTypes';
import axios from '../../../services/axios';
import { CircularProgress } from '@mui/material';
import { darkGreen } from '../../../config/collors/colors';
import Footer from '../../../components/footer';

function AtualizarFrequencia(): JSX.Element {
  document.title = 'Atualizar Frequência';
  const [classApi, setClassApi] = useState<Class[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('/frequencia');
        data.map((room: Class) => {
          room.selected = false;
          const date = new Date(room.updated_at);
          room.updated_at = new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: 'America/Sao_Paulo',
          }).format(date);
        });
        setClassApi(data);
      } catch (e) {
        setLoading(false);
      }
    })();
  }, [loading]);

  return (
    <>
      <DenseHeader text="Atualizar frequência" />

      <Main style={{ display: 'flex', flexDirection: 'column' }}>
        <h2>Suas salas abaixo: </h2>
        {loading ? (
          <CircularProgress
            style={{ color: darkGreen, margin: 'auto', marginTop: '100px' }}
          />
        ) : (
          <TableComponent ClassPayload={classApi} setLoading={setLoading} />
        )}
      </Main>
      <Footer />
    </>
  );
}

export default AtualizarFrequencia;
