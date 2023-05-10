import { useState, useEffect } from 'react';
import DenseHeader from '../../../components/headers/dense';
import { Main, Tools } from './styled';

import { useSelector } from 'react-redux';
import { States } from '../../../store/globalTypes';

import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Tool from '../../../components/tool/tool';
import { RoomPreferences } from '@mui/icons-material';
import { History } from '@mui/icons-material';

function Frequencia(): JSX.Element {
  const [level, setLevel] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const levelState = useSelector(
    (state: States): number => state.authReducer.level,
  );
  const loadingState = useSelector(
    (state: States): boolean => state.authReducer.loading,
  );

  useEffect(() => {
    setLevel(levelState);
    setLoading(loadingState);
  }, [levelState, loadingState]);

  return (
    <>
      <DenseHeader text="Frequência" />

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
          <Tool
            text="Administrar salas"
            to="/tools/frequencia/administrar-salas"
            icon={<RoomPreferences />}
            level={level}
            levelRequired={2}
          />
          <Tool
            text="Histórico de frequências"
            to="/tools/frequencia/historico-de-frequencias"
            icon={<History />}
            level={level}
            levelRequired={2}
          />
        </Tools>
      </Main>
    </>
  );
}

export default Frequencia;
