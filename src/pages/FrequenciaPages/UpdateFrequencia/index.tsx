import React from 'react';
import DenseHeader from '../../../components/headers/dense';
import { Main } from './styled';
import TableComponent from '../../../components/table';

function AtualizarFrequencia(): JSX.Element {
  return (
    <React.Fragment>
      <DenseHeader text="Atualizar frequência" />

      <Main>
        <TableComponent
          ClassPayload={[
            { id: 0, name: 'Sala 01', amount: 39 },
            { id: 1, name: 'Sala 02', amount: 50 },
            { id: 2, name: 'Sala 03', amount: 25 },
            { id: 3, name: 'Sala 04', amount: 10 },
            { id: 4, name: 'Sala 05', amount: 9 },
          ]}
        />
      </Main>
    </React.Fragment>
  );
}

export default AtualizarFrequencia;
