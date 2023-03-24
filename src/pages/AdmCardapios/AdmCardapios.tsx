import React, { useState, useEffect } from 'react';
import { Main, Tools } from './styled';
import DenseHeader from '../../components/headers/dense';
import Tool from '../../components/tool/tool';
import PostAdd from '@mui/icons-material/PostAdd';
import { States } from '../../store/globalTypes';
import { useSelector } from 'react-redux';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
function AdmCardapios(): JSX.Element {
  const [level, setLevel] = useState(0);
  const levelState = useSelector(
    (state: States): number => state.authReducer.level,
  );

  useEffect(() => {
    setLevel(levelState);
  }, [levelState]);
  return (
    <React.Fragment>
      <DenseHeader text="Administrar Cardápios" />
      <Main>
        <h4 style={{ textAlign: 'left' }}>Funcionalidades disponíveis: </h4>

        <Tools
          style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
        >
          <Tool
            text="Criar cardápio"
            icon={<PostAdd />}
            to="/tools/adm-cardapios/criar-cardapios"
            level={level}
            levelRequired={2}
          />
          <Tool
            text="Editar cardápio"
            icon={<AppRegistrationIcon />}
            to="/tools/adm-cardapios/atualizar-cardapios"
            level={level}
            levelRequired={2}
          />
        </Tools>
      </Main>
    </React.Fragment>
  );
}

export default AdmCardapios;
