import { useState, useEffect } from 'react';
import DenseHeader from '../../../components/headers/dense';
import { Main } from './styled';
import TableSalas from '../../../components/tables/tableSalas';
import { Class } from '../../../store/globalTypes';
import axios from '../../../services/axios';
import { CircularProgress } from '@mui/material';
import { darkGreen } from '../../../config/collors/colors';

function AdministrarSalas(): JSX.Element {
  const [classApi, setClassApi] = useState<Class[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('/frequencia');
        data.map((room: Class) => {
          room.selected = false;
        });
        setClassApi(data);
      } catch (e) {
        setLoading(false);
        console.log(e);
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
          <TableSalas ClassPayload={classApi} setLoading={setLoading} />
        )}
      </Main>
    </>
  );
}

export default AdministrarSalas;
