import { useState, useEffect } from 'react';
import DenseHeader from '../../../components/headers/dense';
import { Main } from './styled';
import TableSalas from '../../../components/tables/tableSalas';
import { Class } from '../../../store/globalTypes';
import axios from '../../../services/axios';
import { CircularProgress } from '@mui/material';
import { darkGreen } from '../../../config/collors/colors';
import Footer from '../../../components/footer';

function AdministrarSalas(): JSX.Element {
  document.title = 'Administrar salas';
  const [classApi, setClassApi] = useState<Class[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('/room/');
        data.map((room: Class) => {
          room.selected = false;
        });
        data.sort((a: Class, b: Class) =>
          a.name.localeCompare(b.name, 'pt-BR', {
            sensitivity: 'base',
          }),
        );
        setClassApi(data);
      } catch (e) {
        setLoading(false);
      }
    })();
  }, [loading]);

  return (
    <>
      <DenseHeader text="Administrar salas" />

      <Main style={{ display: 'flex', flexDirection: 'column' }}>
        <h2>Suas salas abaixo: </h2>
        {loading ? (
          <CircularProgress
            style={{ color: darkGreen, margin: 'auto', marginTop: '100px' }}
          />
        ) : (
          <TableSalas ClassPayload={classApi} setLoading={setLoading} />
        )}
      </Main>
      <Footer />
    </>
  );
}

export default AdministrarSalas;
