import React from 'react';
import DenseHeader from '../../../components/headers/dense';
import { Main } from './styled';
import TableComponent from '../../../components/tables/table';

function AtualizarFrequencia(): JSX.Element {
  return (
    <React.Fragment>
      <DenseHeader text="Atualizar frequência" />

      <Main style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <TableComponent
          ClassPayload={[
            { id: 0, sala: 'Sala 01', qtd_presentes: 39, selected: false },
            { id: 1, sala: 'Sala 02', qtd_presentes: 50, selected: false },
            { id: 2, sala: 'Sala 03', qtd_presentes: 25, selected: false },
            { id: 3, sala: 'Sala 04', qtd_presentes: 30, selected: false },
            { id: 4, sala: 'Sala 05', qtd_presentes: 1, selected: false },
            { id: 5, sala: 'Sala 06', qtd_presentes: 130, selected: false },
          ]}
        />
      </Main>
    </React.Fragment>
  );
}

export default AtualizarFrequencia;
