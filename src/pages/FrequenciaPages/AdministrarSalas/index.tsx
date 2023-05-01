import { useState, useEffect } from 'react';
import DenseHeader from '../../../components/headers/dense';
import { Main } from './styled';
import TableSalas from '../../../components/tables/tableSalas';
import { Class } from '../../../store/globalTypes';

function AdministrarSalas(): JSX.Element {
  const [classApi, setClassApi] = useState<Class[]>([
    { id: 0, name: 'Sala 01', amount: 39, selected: false },
    { id: 1, name: 'Sala 02', amount: 50, selected: false },
    { id: 2, name: 'Sala 03', amount: 25, selected: false },
    { id: 3, name: 'Sala 04', amount: 30, selected: false },
    { id: 4, name: 'Sala 05', amount: 1, selected: false },
    { id: 5, name: 'Sala 06', amount: 130, selected: false },
  ]);

  return (
    <>
      <DenseHeader text="Atualizar frequência" />

      <Main style={{ display: 'flex', flexDirection: 'column' }}>
        <h2>Suas salas abaixo: </h2>
        <TableSalas ClassPayload={classApi} />
      </Main>
    </>
  );
}

export default AdministrarSalas;
