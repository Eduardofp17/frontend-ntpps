import React, { useState } from 'react';
import DenseHeader from '../../../components/headers/dense';
import { Main, RequestsContainer } from './styled';
import RequestComponent from '../../../components/Request';
import axios from '../../../services/axios';
import { useSelector } from 'react-redux';
import { States } from '../../../store/globalTypes';
import { Request } from '../../../store/globalTypes';

function AtualizarFrequencia(): JSX.Element {
  return (
    <React.Fragment>
      <DenseHeader text="Atualizar frequência" to="/tools/frequencia" />

      <Main>
        <h2>Hi there</h2>
      </Main>
    </React.Fragment>
  );
}

export default AtualizarFrequencia;
