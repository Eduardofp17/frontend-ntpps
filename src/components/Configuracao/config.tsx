import React from 'react';
import { MainComponent } from './styled';
import CloseIcon from '@mui/icons-material/Close';
import Switch from '@mui/material/Switch';
import axios from '../../services/axios';
import { States } from '../../store/globalTypes';
import { useSelector } from 'react-redux';

function ConfigComponent() {
  const [close, setClose] = React.useState<boolean>(false);
  const [allowRequest, setAllowRequest] = React.useState<boolean>(false);
  const token = useSelector((state: States): string => state.authReducer.token);
  const schoolId = useSelector(
    (state: States): number => state.authReducer.school_id,
  );
  const levelState = useSelector(
    (state: States): number => state.authReducer.level,
  );
  axios.defaults.headers.Authorization = `Bearer ${token}`;
  const getAllowRequest = async () => {
    try {
      const response = await axios.get('/school/');
      const { data } = response;
      for (const school of data) {
        if (school.id === schoolId) setAllowRequest(school.accepting_accounts);
      }
      return true;
    } catch (e) {
      return false;
    }
  };
  React.useEffect(() => {
    getAllowRequest();
  }, []);
  const allowRequestAPI = async (allowRequest: boolean) => {
    try {
      await axios.put('/school/', {
        accepting_accounts: allowRequest,
      });
      setAllowRequest(allowRequest);
    } catch (e) {
      return 'An error ocurred';
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    allowRequestAPI(!allowRequest);
  };
  return (
    <React.Fragment>
      <MainComponent style={{ display: close ? 'none' : 'flex' }}>
        <div className="ConfigHeader">
          <h3>Configurações</h3>
          <div onClick={() => setClose(true)}>
            <CloseIcon style={{ fontSize: '30px', marginTop: '18px' }} />
          </div>
        </div>

        <div className="Configs">
          <div
            className="config1 config"
            style={{ display: levelState < 3 ? 'none' : 'flex' }}
          >
            <p>Permitir solicitações: </p>
            <Switch
              value={allowRequest}
              onChange={(e) => handleChange(e)}
              checked={allowRequest}
            />
          </div>
        </div>
      </MainComponent>
    </React.Fragment>
  );
}

export default ConfigComponent;
