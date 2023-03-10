import React, { useState, useEffect } from 'react';
import { Main, Tools } from './styled';
import BasicHeader from '../../components/headers/basic';
import Tool from '../../components/tool/tool';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { States } from '../../store/globalTypes';
import { useSelector } from 'react-redux';

function ToolsPage(): JSX.Element {
  const [level, setLevel] = useState(0);
  const levelState = useSelector(
    (state: States): number => state.authReducer.level,
  );

  useEffect(() => {
    setLevel(levelState);
  }, [levelState]);
  return (
    <React.Fragment>
      <BasicHeader to="/" />
      <Main>
        <h4 style={{ textAlign: 'left' }}>Funcionalidades disponíveis: </h4>
        <Tools>
          <Tool
            text="Administrar cardápios"
            icon={<MenuBookIcon />}
            to="/tools/adm-cardapios"
            level={level}
            levelRequired={2}
          />
        </Tools>
      </Main>
    </React.Fragment>
  );
}

export default ToolsPage;
