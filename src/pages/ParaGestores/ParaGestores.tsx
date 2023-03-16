import React, { useState, useEffect } from 'react';
import { Main, Tools } from './styled';
import DenseHeader from '../../components/headers/dense';
import Tool from '../../components/tool/tool';
import { States } from '../../store/globalTypes';
import { useSelector } from 'react-redux';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

function ParaGestores(): JSX.Element {
  const [level, setLevel] = useState(0);
  const levelState = useSelector(
    (state: States): number => state.authReducer.level,
  );

  useEffect(() => {
    setLevel(levelState);
  }, [levelState]);
  return (
    <React.Fragment>
      <DenseHeader text="Para gestores" to="/tools" />

      <Main>
        <h4 style={{ textAlign: 'left' }}>Funcionalidades disponíveis: </h4>

        <Tools
          style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
        >
          <Tool
            text="Pedidos de adesão"
            icon={<GroupAddIcon />}
            to="/tools/gestores/pedidos-de-adesao"
            level={level}
            levelRequired={2}
          />
        </Tools>
      </Main>
    </React.Fragment>
  );
}

export default ParaGestores;
