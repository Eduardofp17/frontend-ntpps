import { useState, useEffect } from 'react';
import { Main, Tools } from './styled';
import BasicHeader from '../../components/headers/basic';
import Tool from '../../components/tool/tool';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { States } from '../../store/globalTypes';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { darkGreen } from '../../config/collors/colors';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Student } from '@phosphor-icons/react';
import Footer from '../../components/footer';

function ToolsPage(): JSX.Element {
  document.title = 'Homepage';
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
      <BasicHeader to="/" />
      <div style={{ display: loading ? 'flex' : 'none' }}>
        <CircularProgress
          style={{ color: darkGreen, margin: 'auto', marginTop: '200px' }}
        />
      </div>

      <Main>
        <h4 style={{ textAlign: 'left' }}>Funcionalidades disponíveis: </h4>
        <Tools>
          {level >= 3 && (
            <Tool
              text="Para gestores"
              icon={<ManageAccountsIcon />}
              to="/tools/gestores"
              level={level}
              levelRequired={3}
            />
          )}
          {level >= 2 && (
            <Tool
              text="Administrar cardápios"
              icon={<MenuBookIcon />}
              to="/tools/adm-cardapios"
              level={level}
              levelRequired={2}
            />
          )}
          {level >= 1 && (
            <Tool
              text="Frequência"
              icon={<Student />}
              to="/tools/frequencia"
              level={level}
              levelRequired={1}
            />
          )}
          {level < 1 && (
            <p>
              Desculpe, mas não temos funcionalidades disponíveis de acordo com
              o seu nível de acesso no momento. Se você acredita que isso é
              incorreto ou gostaria de obter mais informações, por favor entre
              em contato com o gestor da sua instituição.
            </p>
          )}
        </Tools>
      </Main>
      <Footer />
    </>
  );
}

export default ToolsPage;
