import React from 'react';
import DenseHeader from '../../../components/headers/dense';
import { Main } from './styled';
import TableComponent from '../../../components/table';

const dataApi = [14, 37, 26, 30, 35];

function AtualizarFrequencia(): JSX.Element {
  return (
    <React.Fragment>
      <DenseHeader text="Atualizar frequência" />

      <Main>
        <TableComponent PupilAmount={dataApi} />
      </Main>
    </React.Fragment>
  );
}

export default AtualizarFrequencia;
