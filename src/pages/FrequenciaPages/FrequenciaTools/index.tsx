import React, { useState } from 'react';
import DenseHeader from '../../../components/headers/dense';
import { Main, Tools } from './styled';
import RequestComponent from '../../../components/Request';
import axios from '../../../services/axios';
import { useSelector } from 'react-redux';
import { States } from '../../../store/globalTypes';
import { Request } from '../../../store/globalTypes';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Tool from '../../../components/tool/tool';

function Frequencia(): JSX.Element {
  const [level, setLevel] = React.useState<number>(0);
  const [loading, setLoading] = React.useState<boolean>(false);

  const levelState = useSelector(
    (state: States): number => state.authReducer.level,
  );
  const loadingState = useSelector(
    (state: States): boolean => state.authReducer.loading,
  );

  React.useEffect(() => {
    setLevel(levelState);
    setLoading(loadingState);
  }, [levelState, loadingState]);

  return (
    <React.Fragment>
      <DenseHeader text="Frequência" to="/tools" />

      <Main>
        <h4 style={{ textAlign: 'left' }}>Funcionalidades disponiveis: </h4>

        <Tools>
          <Tool
            text="Atualizar frequência"
            to="/tools/frequencia/atualizar-frequencia"
            icon={<GroupAddIcon />}
            level={level}
            levelRequired={2}
          />
        </Tools>
      </Main>
    </React.Fragment>
  );
}

export default Frequencia;
