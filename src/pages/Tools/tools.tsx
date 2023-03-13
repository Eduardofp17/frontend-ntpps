import React from 'react';
import { Main, Tools } from './styled';
import BasicHeader from '../../components/headers/basic';
import Tool from '../../components/tool/tool';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { States } from '../../store/globalTypes';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { darkGreen } from '../../config/collors/colors';

function ToolsPage(): JSX.Element {
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
      <BasicHeader to="/" />
      <div style={{ display: loading ? 'flex' : 'none' }}>
        <CircularProgress
          style={{ color: darkGreen, margin: 'auto', marginTop: '200px' }}
        />
      </div>

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
