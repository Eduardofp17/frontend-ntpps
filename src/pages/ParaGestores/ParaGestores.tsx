import React from 'react';
import { Main, Tools } from './styled';
import DenseHeader from '../../components/headers/dense';
import Tool from '../../components/tool/tool';
import { States } from '../../store/globalTypes';
import { useSelector } from 'react-redux';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import axios from '../../services/axios';
import CircularProgress from '@mui/material/CircularProgress';
import { darkGreen } from '../../config/collors/colors';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Alert from '@mui/material/Alert';
import SettingsIcon from '@mui/icons-material/Settings';

function ParaGestores(): JSX.Element {
  const [level, setLevel] = React.useState<number>(0);
  const [schoolId, setSchoolId] = React.useState<number>(-1);
  const [code, setCode] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [alertOpen, setAlertOpen] = React.useState<boolean>(false);

  const levelState = useSelector(
    (state: States): number => state.authReducer.level,
  );
  const schooldIdState = useSelector(
    (state: States): number => state.authReducer.school_id,
  );

  const getCode = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/school/');
      for (const school of response.data) {
        if (school.id === schoolId) setCode(school.code);
      }
      setLoading(false);
    } catch (e) {
      return 'An error ocurred';
    }
  };

  React.useEffect(() => {
    setLevel(levelState);
    setSchoolId(schooldIdState);
    getCode();
  }, [code, schoolId === -1]);

  /***
   * Enable the copy to clipboard when be ssl in the server
   */
  // const handleCopy = (code: string) => {
  //   navigator.clipboard.writeText(code);
  //   setAlertOpen(true);
  //   setTimeout(() => setAlertOpen(false), 1500);
  // };
  return (
    <React.Fragment>
      <DenseHeader text="Para gestores" icon={<SettingsIcon />} />

      <div style={{ display: loading ? 'flex' : 'none' }}>
        <CircularProgress
          style={{ color: darkGreen, margin: 'auto', marginTop: '200px' }}
        />
      </div>
      <Main style={{ display: loading ? 'none' : 'flex' }}>
        {/* <Alert
          style={{ display: alertOpen ? 'flex' : 'none' }}
          severity="success"
        >
          Código copiado com sucesso
        </Alert> */}
        <h4 style={{ textAlign: 'left' }}>
          Código da sua instituição:{' '}
          <span
            id="code"
            style={{ fontSize: '13px', textDecorationLine: 'underline' }}
          >
            {code}
          </span>
          {/* <span onClick={() => handleCopy(code)}>
            <ContentCopyIcon style={{ fontSize: '20px', paddingLeft: '3px' }} />
          </span> */}
        </h4>
        <div
          className="line"
          style={{ backgroundColor: 'black', height: '1px', width: '100%' }}
        ></div>
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
